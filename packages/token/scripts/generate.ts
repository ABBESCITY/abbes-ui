import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT_DIR = process.cwd();

const DEFINITIONS_DIR = path.resolve(ROOT_DIR, 'src/definitions');

const CSS_OUTPUT_DIR = path.resolve(ROOT_DIR, 'src/generate/css');

interface TokenGroup {
  [key: string]: string | TokenGroup;
}

interface ComponentTokenDefinition {
  component: string;
  selector?: string;
  colorToken?: TokenGroup;
  componentToken?: TokenGroup;
}

/**
 * ESM module cache busting version.
 */
let importVersion = 0;

/**
 * Generate all component token CSS files.
 */
export async function generate() {
  const definitionFiles = await getDefinitionFiles();

  const generatedFiles: string[] = [];

  for (const definitionFile of definitionFiles) {
    const definition = await loadDefinition(definitionFile);

    if (!definition) {
      continue;
    }

    const css = generateCssContent(definition);

    if (!css) {
      continue;
    }

    const outputFile = getOutputFile(definitionFile);

    await writeIfChanged(outputFile, css);

    generatedFiles.push(outputFile);
  }

  /**
   * Generate CSS index.
   */
  const indexCss = generateCssIndex(generatedFiles);

  await writeIfChanged(path.join(CSS_OUTPUT_DIR, 'index.css'), indexCss);

  console.log(`[token] Generated ${generatedFiles.length} component token files.`);
}

/**
 * Find all definition files recursively.
 */
async function getDefinitionFiles(): Promise<string[]> {
  const files: string[] = [];

  async function walk(directory: string) {
    const entries = await fs.readdir(directory, {
      withFileTypes: true,
    });

    for (const entry of entries) {
      const filePath = path.join(directory, entry.name);

      /**
       * Recursive directory.
       */
      if (entry.isDirectory()) {
        await walk(filePath);

        continue;
      }

      /**
       * Only definition files.
       */
      if (entry.isFile() && /\.(ts|js|mjs|mts)$/.test(entry.name) && !entry.name.endsWith('.d.ts')) {
        files.push(filePath);
      }
    }
  }

  await walk(DEFINITIONS_DIR);

  return files.sort();
}

/**
 * Load token definition.
 *
 * IMPORTANT:
 *
 * Node.js caches ESM modules.
 *
 * Without cache busting:
 *
 *   import('./button.ts')
 *
 * will return the old module after the
 * first import.
 *
 * Therefore we append:
 *
 *   ?v=1
 *   ?v=2
 *   ?v=3
 */
async function loadDefinition(filePath: string): Promise<ComponentTokenDefinition | undefined> {
  const url = pathToFileURL(filePath);

  url.searchParams.set('v', String(++importVersion));

  const module = await import(url.href);

  return findComponentTokenDefinition(module);
}

/**
 * Find Component Token definition
 * from module exports.
 */
function findComponentTokenDefinition(module: Record<string, unknown>): ComponentTokenDefinition | undefined {
  for (const value of Object.values(module)) {
    if (isComponentTokenDefinition(value)) {
      return value;
    }
  }

  return undefined;
}

/**
 * Check Component Token definition.
 */
function isComponentTokenDefinition(value: unknown): value is ComponentTokenDefinition {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const definition = value as Record<string, unknown>;

  return (
    typeof definition.component === 'string' &&
    (definition.colorToken !== undefined || definition.componentToken !== undefined)
  );
}

/**
 * Check nested token group.
 */
function isTokenGroup(value: unknown): value is TokenGroup {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Generate component CSS.
 */
function generateCssContent(definition: ComponentTokenDefinition): string {
  const selector = definition.selector ?? getComponentSelector(definition.component);

  const variables: string[] = [];

  /**
   * Color Tokens.
   */
  if (definition.colorToken) {
    variables.push(...generateCssVariables(definition.colorToken, [definition.component], true));
  }

  /**
   * Component Tokens.
   */
  if (definition.componentToken) {
    variables.push(...generateCssVariables(definition.componentToken, [definition.component], false));
  }

  if (variables.length === 0) {
    return '';
  }

  return [`${selector} {`, ...variables.map((variable) => `  ${variable}`), `}`, ''].join('\n');
}

/**
 * Generate CSS variables recursively.
 */
function generateCssVariables(group: TokenGroup, parentPath: string[], isColorToken: boolean): string[] {
  const variables: string[] = [];

  for (const [key, value] of Object.entries(group)) {
    /**
     * Ignore empty values.
     */
    if (!value) {
      continue;
    }

    const currentPath = [...parentPath, key];

    /**
     * Nested token group.
     */
    if (isTokenGroup(value)) {
      variables.push(...generateCssVariables(value, currentPath, isColorToken));

      continue;
    }

    /**
     * CSS variable name.
     *
     * button
     * + container
     * + radius
     *
     * =>
     *
     * --button-container-radius
     */
    const variableName = `--${currentPath.map(toKebabCase).join('-')}`;

    /**
     * Convert color reference.
     */
    const cssValue = isColorToken ? toCssColorValue(value) : value;

    if (!cssValue) {
      continue;
    }

    variables.push(`${variableName}: ${cssValue};`);
  }

  return variables;
}

/**
 * Generate token class name.
 *
 * button
 * =>
 * .AbbesButtonToken
 *
 * date-picker
 * =>
 * .AbbesDatePickerToken
 */
function getComponentSelector(component: string): string {
  const className = component
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

  return `.Abbes${className}Token`;
}

/**
 * Convert color token reference
 * into CSS variable.
 *
 * primary
 * =>
 * var(--sys-color-primary)
 *
 * sys-color-primary
 * =>
 * var(--sys-color-primary)
 *
 * --sys-color-primary
 * =>
 * var(--sys-color-primary)
 *
 * var(--foo)
 * =>
 * var(--foo)
 */
function toCssColorValue(value: string): string {
  const normalizedValue = value.trim();

  if (!normalizedValue) {
    return '';
  }

  if (normalizedValue.startsWith('var(')) {
    return normalizedValue;
  }

  if (normalizedValue.startsWith('--')) {
    return `var(${normalizedValue})`;
  }

  if (normalizedValue.startsWith('sys-')) {
    return `var(--${normalizedValue})`;
  }

  return `var(--sys-color-${toKebabCase(normalizedValue)})`;
}

/**
 * Convert string to kebab-case.
 */
function toKebabCase(value: string): string {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .replace(/[_\s]+/g, '-')
    .toLowerCase();
}

/**
 * Get generated CSS path.
 *
 * src/definitions/components/button.ts
 *
 * =>
 *
 * src/generate/css/components/button.css
 */
function getOutputFile(definitionFile: string): string {
  const relativePath = path.relative(DEFINITIONS_DIR, definitionFile);

  const parsed = path.parse(relativePath);

  return path.join(CSS_OUTPUT_DIR, parsed.dir, `${parsed.name}.css`);
}

/**
 * Generate CSS index.
 */
function generateCssIndex(files: string[]): string {
  const imports = files
    .map((file) => {
      const relativePath = path.relative(CSS_OUTPUT_DIR, file).replace(/\\/g, '/');

      return `@import './${relativePath}';`;
    })
    .join('\n');

  return `${imports}\n`;
}

/**
 * Write file only when changed.
 */
async function writeIfChanged(filePath: string, content: string): Promise<void> {
  let previousContent: string | undefined;

  try {
    previousContent = await fs.readFile(filePath, 'utf8');
  } catch {
    /**
     * File doesn't exist.
     */
  }

  if (previousContent === content) {
    return;
  }

  await fs.mkdir(path.dirname(filePath), {
    recursive: true,
  });

  await fs.writeFile(filePath, content, 'utf8');

  console.log(`[token] updated: ${path.relative(ROOT_DIR, filePath)}`);
}

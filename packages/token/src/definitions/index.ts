import { BaseContract, ElevatedContract, InverseContract, SurfaceContract } from './common/color';
import { ElevationContract } from './common/elevation';
import { SpaceContract } from './common/space';
import { StateContract } from './common/state';
import { BodyContract, DisplayContract, HeadlineContract, LabelContract, TitleContract } from './common/typography';

import type { ThemeTokenContract } from '../types/theme';

export const Token: ThemeTokenContract = {
  color: {
    primary: BaseContract,
    secondary: BaseContract,
    tertiary: BaseContract,
    warn: BaseContract,
    danger: BaseContract,
    success: BaseContract,
    info: BaseContract,
    surface: SurfaceContract,
    inverse: InverseContract,
    elevated: ElevatedContract,
  },
  typography: {
    display: DisplayContract,
    headline: HeadlineContract,
    title: TitleContract,
    body: BodyContract,
    label: LabelContract,
  },
  space: SpaceContract,
  state: StateContract,
  elevation: ElevationContract,
};

export * from './common/color';
export * from './common/state';
export * from './common/elevation';
export * from './common/typography';

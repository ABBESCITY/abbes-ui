import { cn } from 'cn';
import Image from 'next/image';

import Logo from '@/assets/img/logo/logo.png';

type LogoProps = {
  className?: string;
};

type SiteLogoProps = LogoProps & {
  name?: string;
  showName?: boolean;
};

export function SiteLogo({ className, name = 'Abbes UI', showName = true }: SiteLogoProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Image src={Logo} alt="logo" className="h-9 w-9" />
      {showName ? (
        <span className="font-heading text-[15px] leading-none font-semibold tracking-tight">{name}</span>
      ) : null}
    </div>
  );
}

import type { ReactNode } from 'react';
import { Link, NavLink } from 'react-router';

import logo from '@/assets/logo.png';

import './PlaygroundLayout.scss';

type NavItem = {
  label: string;
  to: string;
  disabled?: boolean;
};

type PlaygroundLayoutProps = {
  children: ReactNode;
  navItems: NavItem[];
};

export function PlaygroundLayout({ children, navItems }: PlaygroundLayoutProps) {
  return (
    <main className="shell">
      <aside className="sidebar" aria-label="Component navigation">
        <Link className="brand" to="/">
          <img className="brand-logo" src={logo} alt="Abbes UI" />
          <h3 className="brand-title">PLAYGROUND</h3>
        </Link>
        <nav className="nav">
          {navItems.map((item) =>
            item.disabled ? (
              <span key={item.label} className="nav-item disabled">
                {item.label}
              </span>
            ) : (
              <NavLink
                key={item.label}
                className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
                to={item.to}
              >
                {item.label}
              </NavLink>
            ),
          )}
        </nav>
      </aside>
      <section className="workspace">{children}</section>
    </main>
  );
}

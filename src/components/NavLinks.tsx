'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav>
      <div className="content">
        <ul>
          <li>
            <Link href="/" data-active={pathname === '/'}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" data-active={pathname === '/about'}>
              About
            </Link>
          </li>
          <li>
            <Link href="/projects" data-active={pathname === '/projects'}>
              Projects
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

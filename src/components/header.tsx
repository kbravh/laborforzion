import Link from 'next/link';
import {HoverUnderline} from './links';

export const Header = () => {
  return (
    <div className="flex justify-between py-4 px-8 items-center max-w-7xl mx-auto w-full">
      <Link href="/">
        <div className="text-slate-700 text-6xl cursor-pointer select-none flex items-center gap-3">
          <span>K</span>
        </div>
      </Link>
      <Navbar />
    </div>
  );
};

const Navbar = () => (
  <nav className="flex text-slate-700 list-none gap-6">
    <li>
      <HoverUnderline>
        <Link href="/writing">Writing</Link>
      </HoverUnderline>
    </li>
    <li>
      <HoverUnderline>
        <Link href="/projects">Projects</Link>
      </HoverUnderline>
    </li>
    <li>
      <HoverUnderline>
        <Link href="/about">About</Link>
      </HoverUnderline>
    </li>
  </nav>
);

import Link from 'next/link';
import {HoverUnderline} from './links';
import { Logo } from './logo';

export const Header = () => {
  return (
    <div className="flex justify-between py-4 px-8 items-center max-w-6xl mx-auto mt-8 mb-5 w-full">
      <Link href="/">
        <div className="text-slate-700 text-6xl cursor-pointer select-none flex items-center gap-3">
          <Logo className='h-12 w-12 bg-emerald-900 rounded-full' />
        </div>
      </Link>
      <Navbar />
    </div>
  );
};

const Navbar = () => (
  <nav className="flex text-slate-700 list-none gap-6 text-lg">
    <li>
      <HoverUnderline>
        <Link href="/">Home</Link>
      </HoverUnderline>
    </li>
    <li>
      <HoverUnderline>
        <Link href="/notes">Notes</Link>
      </HoverUnderline>
    </li>
    <li>
      <HoverUnderline>
        <Link href="/about">About</Link>
      </HoverUnderline>
    </li>
  </nav>
);

// tasker/src/components/HeaderParts/Logo.tsx
import Link from 'next/link';

const Logo = () => (
  <Link href="/" className="text-5xl md:text-2xl lg:text-2xl font-bold text-indigo-900 hover:text-indigo-700 hover:scale-125 transform duration-300">
    Tasker
  </Link>
);

export default Logo;

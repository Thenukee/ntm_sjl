import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-cream/90 backdrop-blur border-b border-sage/30">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="font-bold text-terra">Your&nbsp;Name</Link>
        <ul className="flex gap-6 text-sm font-medium">
          {['about','projects','contact'].map(id => (
            <li key={id}>
              <Link href={`/#${id}`} className="hover:text-sky transition">{id.charAt(0).toUpperCase()+id.slice(1)}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

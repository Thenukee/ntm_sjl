import './globals.css';
import type {  Viewport } from 'next';
import { Metadata } from 'next';
import Navbar from './components/Navbar';
export const metadata: Metadata = {
  title: 'Your Name – Data & Insights',
  description: 'Portfolio mixing analytics, dogs & travel.',
  
};
// ✅ NEW – place themeColor here
export const viewport: Viewport = {
  themeColor: '#C75E4B',          // terracotta
  width: 'device-width',
  initialScale: 1,
};

export const dynamic = 'force-static';        // HTML export

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">

      <body className="bg-cream text-evening antialiased">
        <Navbar />  
        <section className="min-h-[70vh] flex flex-col pt-32">
          {children}
        </section>
      </body>
    </html>
  );
}

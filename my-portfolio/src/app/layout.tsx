import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your Name – Data & Insights',
  description: 'Portfolio mixing analytics, dogs & travel.',
  themeColor: '#C75E4B',
};

export const dynamic = 'force-static';        // HTML export

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-cream text-evening antialiased">{children}</body>
    </html>
  );
}

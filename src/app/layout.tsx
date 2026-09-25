import type { Metadata } from 'next';
import '@/src/styles/globals.css';
import { SITE_METADATA } from '@/src/lib/constants';

export const metadata: Metadata = {
  title: SITE_METADATA.title,
  description: SITE_METADATA.description,
  keywords: [
    'Hill Safe',
    'drone site intelligence',
    'terrain analysis',
    '3D reconstruction',
    'physics informed neural networks',
    'aerial mapping',
    'photogrammetry',
    'construction monitoring',
  ],
  openGraph: {
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-space-950 text-slate-100 min-h-screen selection:bg-terrain-green selection:text-space-950">
        {children}
      </body>
    </html>
  );
}

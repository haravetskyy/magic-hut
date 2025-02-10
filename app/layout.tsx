import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Magic Hut',
  description: 'Authentication service for Harbor Task',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className="antialiased">{children}</body>
    </html>
  );
}

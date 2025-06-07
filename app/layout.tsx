import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

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
      <body className="antialiased">
        <main className="h-svh w-svw">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}

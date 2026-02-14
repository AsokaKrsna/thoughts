import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata = {
  title: {
    default: "Asokakrsna's Thoughts",
    template: "%s | Asokakrsna's Thoughts",
  },
  description: 'Cybersecurity, AI, and the things that keep me up at night.',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: "Asokakrsna's Thoughts",
    description: 'Cybersecurity, AI, and the things that keep me up at night.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning className={`${inter.variable} ${jetbrains.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}


import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Box, Flex } from '@chakra-ui/react';
import { Provider } from '@/components/ui/provider';
import { Header } from '@/components/organisms/Header';
import { Footer } from '@/components/organisms/Footer';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ポートフォリオ | 松本 昂大',
  description:
    '松本 昂大のポートフォリオ。React と Next.js で作った Web アプリを載せています。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Provider>
          <Flex minH="100vh" direction="column">
            <Header />
            <Box as="main" flex="1" display="flex" flexDirection="column">
              {children}
            </Box>
            <Footer />
          </Flex>
        </Provider>
      </body>
    </html>
  );
}

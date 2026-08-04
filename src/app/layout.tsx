import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Box, Flex } from '@chakra-ui/react';
import { Provider } from '@/components/ui/provider';
import { Header } from '@/components/organisms/Header';
import { Footer } from '@/components/organisms/Footer';
import { PageBackground } from '@/components/atoms/PageBackground';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// TODO: 実際のタイトル・説明文に置き換える(現状はプレースホルダー)
export const metadata: Metadata = {
  title: 'Portfolio Site',
  description: 'Personal portfolio built with Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Provider>
          <PageBackground />
          <Flex minH="100vh" direction="column" position="relative" zIndex="1">
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

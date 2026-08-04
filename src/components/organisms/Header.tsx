'use client';

import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { Box, Flex, Link } from '@chakra-ui/react';
import { ColorModeButton } from '@/components/ui/color-mode';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      zIndex="sticky"
      borderBottomWidth="1px"
      borderColor="border/60"
      bg="bg/70"
      backdropFilter="blur(10px)"
    >
      <Flex
        maxW="3xl"
        mx="auto"
        align="center"
        justify="space-between"
        px="6"
        py="4"
      >
        <Link asChild fontWeight="semibold">
          <NextLink href="/">Portfolio Site</NextLink>
        </Link>
        <Flex gap="6" fontSize="sm" align="center">
          {navLinks.map((navLink) => {
            const isActive = pathname === navLink.href;
            return (
              <Link
                key={navLink.href}
                asChild
                fontWeight={isActive ? 'semibold' : 'normal'}
                color={isActive ? 'brand.fg' : undefined}
              >
                <NextLink href={navLink.href}>{navLink.label}</NextLink>
              </Link>
            );
          })}
          <ColorModeButton />
        </Flex>
      </Flex>
    </Box>
  );
}

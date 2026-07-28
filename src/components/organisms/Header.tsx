import NextLink from 'next/link';
import { Box, Flex, Link } from '@chakra-ui/react';
import { ColorModeButton } from '@/components/ui/color-mode';

export function Header() {
  return (
    <Box as="header" borderBottomWidth="1px" borderColor="border">
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
          <Link asChild>
            <NextLink href="/">Home</NextLink>
          </Link>
          <Link asChild>
            <NextLink href="/projects">Projects</NextLink>
          </Link>
          <ColorModeButton />
        </Flex>
      </Flex>
    </Box>
  );
}

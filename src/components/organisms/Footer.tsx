import { Box, Flex, Link, Text } from '@chakra-ui/react';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <Box as="footer" borderTopWidth="1px" borderColor="border">
      <Flex
        maxW="3xl"
        mx="auto"
        align="center"
        justify="space-between"
        px="6"
        py="4"
        fontSize="sm"
        color="fg.muted"
      >
        <Text>&copy; {year}</Text>
        <Link
          href="https://github.com/kouta1211"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </Link>
      </Flex>
    </Box>
  );
}

import { Box, type BoxProps } from '@chakra-ui/react';

export function PageContainer(props: BoxProps) {
  return (
    <Box
      maxW="3xl"
      mx="auto"
      w="full"
      px="6"
      py="16"
      display="flex"
      flexDirection="column"
      gap="10"
      {...props}
    />
  );
}

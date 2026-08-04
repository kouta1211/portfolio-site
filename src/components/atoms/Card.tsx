import { Box, type BoxProps } from '@chakra-ui/react';

type CardProps = BoxProps & {
  interactive?: boolean;
};

export function Card({ interactive, ...props }: CardProps) {
  return (
    <Box
      bg="bg.panel"
      borderWidth="1px"
      borderColor="border"
      borderRadius="xl"
      boxShadow="sm"
      transition={interactive ? 'all 0.2s ease-out' : undefined}
      _hover={
        interactive
          ? {
              transform: 'translateY(-6px)',
              borderColor: 'brand.400',
              shadow: 'lg',
            }
          : undefined
      }
      {...props}
    />
  );
}

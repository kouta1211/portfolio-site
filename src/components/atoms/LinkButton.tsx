import NextLink from 'next/link';
import { Button, type ButtonProps } from '@chakra-ui/react';

type LinkButtonProps = Omit<ButtonProps, 'asChild' | 'as'> & {
  href: string;
};

export function LinkButton({
  href,
  variant = 'solid',
  size = 'lg',
  colorPalette = 'brand',
  children,
  ...props
}: LinkButtonProps) {
  const isExternal = href.startsWith('http');

  return (
    <Button
      asChild
      variant={variant}
      size={size}
      colorPalette={colorPalette}
      {...props}
    >
      {isExternal ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      ) : (
        <NextLink href={href}>{children}</NextLink>
      )}
    </Button>
  );
}

import { Badge } from '@chakra-ui/react';

export function TechBadge({ label }: { label: string }) {
  return (
    <Badge
      variant="subtle"
      colorPalette="brand"
      borderRadius="full"
      px="3"
      py="1"
    >
      {label}
    </Badge>
  );
}

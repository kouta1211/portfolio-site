import { Badge } from '@chakra-ui/react';

export function TechBadge({ label }: { label: string }) {
  return (
    <Badge
      variant="subtle"
      colorPalette="gray"
      borderRadius="full"
      px="3"
      py="1"
    >
      {label}
    </Badge>
  );
}

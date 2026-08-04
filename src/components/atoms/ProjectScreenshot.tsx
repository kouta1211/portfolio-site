import Image from 'next/image';
import { Text } from '@chakra-ui/react';
import { Card } from '@/components/atoms/Card';

export function ProjectScreenshot({
  label,
  src,
  alt,
}: {
  label: string;
  src?: string;
  alt?: string;
}) {
  return (
    <Card
      position="relative"
      overflow="hidden"
      aspectRatio={16 / 9}
      display="flex"
      alignItems="center"
      justifyContent="center"
      color="fg.muted"
    >
      {src ? (
        <Image
          src={src}
          alt={alt ?? `${label}のスクリーンショット`}
          fill
          sizes="(min-width: 48em) 720px, 100vw"
          style={{ objectFit: 'cover' }}
        />
      ) : (
        <Text>{label}のスクリーンショット(準備中)</Text>
      )}
    </Card>
  );
}

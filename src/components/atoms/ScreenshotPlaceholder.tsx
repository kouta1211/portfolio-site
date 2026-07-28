import { Box, Text } from '@chakra-ui/react';

// 実スクリーンショットを用意したら、このコンポーネントの代わりに next/image で差し替える
export function ScreenshotPlaceholder({ label }: { label: string }) {
  return (
    <Box
      aspectRatio={16 / 9}
      bg="bg.muted"
      color="fg.muted"
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderRadius="lg"
    >
      <Text>{label}のスクリーンショット(準備中)</Text>
    </Box>
  );
}

import { Heading, Stack, Text } from '@chakra-ui/react';

// TODO: 実際の名前・肩書き・一言メッセージに差し替える(現状はプレースホルダー)
export function Hero() {
  return (
    <Stack align="center" gap="4" py="20" textAlign="center">
      <Heading as="h1" size="4xl">
        氏名(仮)
      </Heading>
      <Text fontSize="lg" color="fg.muted">
        肩書き(仮) — 一言メッセージ(仮)
      </Text>
    </Stack>
  );
}

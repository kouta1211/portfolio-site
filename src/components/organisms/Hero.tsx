import { Heading, Stack, Text } from '@chakra-ui/react';

export function Hero() {
  return (
    <Stack align="center" gap="4" py="20" textAlign="center">
      <Heading as="h1" size="4xl">
        松本 昂大
      </Heading>
      <Text fontSize="sm" color="fg.muted">
        （まつもと こうた）
      </Text>
      <Text fontSize="lg" color="fg.muted">
        フロントエンド/フルスタック開発を学習中のエンジニア —
        小規模な案件でお力になれればと思っています
      </Text>
    </Stack>
  );
}

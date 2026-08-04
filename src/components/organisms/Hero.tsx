'use client';

import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import { motion, useReducedMotion } from 'motion/react';
import { LinkButton } from '@/components/atoms/LinkButton';

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Box py="24" px="6">
      <Box asChild>
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Stack align="center" gap="4" textAlign="center">
            <Heading
              as="h1"
              size="4xl"
              bgGradient="to-r"
              gradientFrom="brand.600"
              gradientTo="brand.400"
              bgClip="text"
              _dark={{ gradientFrom: 'brand.300', gradientTo: 'brand.100' }}
            >
              松本 昂大
            </Heading>
            <Text fontSize="sm" color="fg.muted">
              （まつもと こうた）
            </Text>
            <Text fontSize="lg" color="fg.muted" maxW="xl">
              フロントエンド/フルスタック開発を学習中のエンジニア —
              小規模な案件でお力になれればと思っています
            </Text>
            <Stack direction="row" gap="4" pt="4">
              <LinkButton href="/projects">プロジェクトを見る</LinkButton>
              <LinkButton href="https://github.com/kouta1211" variant="outline">
                GitHub
              </LinkButton>
            </Stack>
          </Stack>
        </motion.div>
      </Box>
    </Box>
  );
}

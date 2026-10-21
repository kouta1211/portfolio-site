'use client';

import Image from 'next/image';
import { Box, Flex, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { motion, useReducedMotion } from 'motion/react';
import { LinkButton } from '@/components/atoms/LinkButton';
import type { Project } from '@/lib/projects';

// Choreon の踊り手の色。見出しの上に並べる
const dancerColors = [
  'dancer.blue',
  'dancer.red',
  'dancer.green',
  'dancer.amber',
] as const;

// 背景の光のにじみ。Chakra のトークンは CSS 変数として参照する
const glow = [
  'radial-gradient(closest-side, color-mix(in srgb, var(--chakra-colors-dancer-blue) 30%, transparent), transparent 70%)',
  'radial-gradient(closest-side at 20% 80%, color-mix(in srgb, var(--chakra-colors-dancer-red) 14%, transparent), transparent 70%)',
].join(', ');

export function Hero({ featured }: { featured: Project | null }) {
  const shouldReduceMotion = useReducedMotion();
  const cover = featured?.screenshots?.[0];

  return (
    <Box position="relative" overflow="hidden">
      <Box
        aria-hidden
        position="absolute"
        top="-20%"
        right="-10%"
        w="70%"
        h="130%"
        pointerEvents="none"
        bgImage={glow}
        opacity="0.5"
        _dark={{ opacity: 1 }}
      />
      <Box asChild position="relative">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <SimpleGrid
            columns={{ base: 1, md: cover ? 2 : 1 }}
            gap={{ base: '12', md: '14' }}
            alignItems="center"
            maxW="6xl"
            mx="auto"
            px="6"
            py={{ base: '16', md: '24' }}
          >
            <Stack gap="6" minW="0">
              <Flex gap="2" aria-hidden>
                {dancerColors.map((color) => (
                  <Box
                    key={color}
                    boxSize="2.5"
                    borderRadius="full"
                    bg={color}
                  />
                ))}
              </Flex>
              <Text fontSize="sm" color="fg.muted" letterSpacing="wide">
                <Text as="span" fontWeight="semibold" color="fg">
                  松本 昂大
                </Text>
                （まつもと こうた）
              </Text>
              <Heading
                as="h1"
                fontSize={{ base: '4xl', md: '4xl', lg: '5xl', '2xl': '6xl' }}
                fontWeight="black"
                lineHeight="1.2"
                // 日本語を単語の途中で折り返さない。改行は <br> の位置だけ
                wordBreak="keep-all"
              >
                踊る人のスマホに、
                <br />
                隊形を届ける。
              </Heading>
              <Text fontSize="lg" color="fg.muted" maxW="xl">
                React と Next.js で Web アプリを作っています。
                {featured && (
                  <>
                    代表作の {featured.name} は、振付師が PC
                    で組んだ隊形を、踊る人がスマホの URL
                    1本で確かめられるアプリです。自分が受け持つダンスレッスンの発表会で使い、生徒にもスマホで見てもらいました。
                  </>
                )}
                小規模な開発のご相談を受け付けています。
              </Text>
              <Flex gap="3" wrap="wrap" pt="2">
                {featured ? (
                  <>
                    <LinkButton href={`/projects/${featured.slug}`}>
                      {featured.name} を見る
                    </LinkButton>
                    <LinkButton href="/projects" variant="outline">
                      ほかの作品
                    </LinkButton>
                  </>
                ) : (
                  <LinkButton href="/projects">作ったものを見る</LinkButton>
                )}
              </Flex>
            </Stack>

            {featured && cover && (
              /* スマホ幅では傾けない（画面が狭いと、傾けた分だけ読みにくくなる） */
              <Box
                position="relative"
                aspectRatio={16 / 10}
                borderRadius="xl"
                overflow="hidden"
                borderWidth="1px"
                borderColor="border"
                bg="bg.muted"
                transform={{
                  md: 'perspective(1400px) rotateY(-9deg) rotateX(4deg)',
                }}
                boxShadow="0 40px 80px -30px color-mix(in srgb, var(--chakra-colors-dancer-blue) 45%, transparent)"
              >
                <Image
                  src={cover}
                  alt={`${featured.name}の画面`}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  style={{ objectFit: 'cover', objectPosition: 'top' }}
                  priority
                />
              </Box>
            )}
          </SimpleGrid>
        </motion.div>
      </Box>
    </Box>
  );
}

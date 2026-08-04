'use client';

import { Box } from '@chakra-ui/react';
import { motion, useReducedMotion } from 'motion/react';

type Blob = {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  size: string;
  gradient: string;
  range: [number, number, number];
  duration: number;
};

// Chakraのtoken参照({colors.brand.400}等)はradial-gradient内では解決されないため、
// theme.tsのbrandトークンと同じ値を直接指定する
const blobs: Blob[] = [
  {
    top: '-10%',
    left: '-10%',
    size: '22rem',
    gradient: 'radial-gradient(circle, #8b83fb 0%, transparent 70%)',
    range: [0, 24, 0],
    duration: 14,
  },
  {
    top: '10%',
    right: '-8%',
    size: '18rem',
    gradient: 'radial-gradient(circle, #a5abff 0%, transparent 70%)',
    range: [0, -20, 0],
    duration: 18,
  },
  {
    bottom: '-15%',
    left: '20%',
    size: '20rem',
    gradient: 'radial-gradient(circle, #7c6ef2 0%, transparent 70%)',
    range: [0, 16, 0],
    duration: 16,
  },
];

export function HeroBackground() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Box
      position="absolute"
      inset="0"
      overflow="hidden"
      pointerEvents="none"
      zIndex="0"
    >
      {blobs.map((blob, index) => (
        <Box
          key={index}
          asChild
          position="absolute"
          top={blob.top}
          left={blob.left}
          right={blob.right}
          bottom={blob.bottom}
          w={blob.size}
          h={blob.size}
          borderRadius="full"
          bgImage={blob.gradient}
          filter="blur(40px)"
          opacity="0.5"
        >
          <motion.div
            animate={
              shouldReduceMotion ? undefined : { y: blob.range, x: blob.range }
            }
            transition={{
              duration: blob.duration,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </Box>
      ))}
    </Box>
  );
}

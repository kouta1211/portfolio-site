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

// theme.tsのbrandトークンと同じ色を直接指定する(radial-gradient内ではtoken参照が解決されないため)
const blobs: Blob[] = [
  {
    top: '-10%',
    left: '-10%',
    size: '26rem',
    gradient: 'radial-gradient(circle, #8b83fb 0%, transparent 70%)',
    range: [0, 24, 0],
    duration: 14,
  },
  {
    top: '5%',
    right: '-8%',
    size: '22rem',
    gradient: 'radial-gradient(circle, #a5abff 0%, transparent 70%)',
    range: [0, -20, 0],
    duration: 18,
  },
  {
    bottom: '-10%',
    left: '30%',
    size: '24rem',
    gradient: 'radial-gradient(circle, #7c6ef2 0%, transparent 70%)',
    range: [0, 16, 0],
    duration: 16,
  },
];

// 画面に固定表示することで、Header/Hero/About/Projects/Footerのどこを見ても
// 同じ背景の上に乗っているように見え、セクションごとの見た目の分断を防ぐ
export function PageBackground() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Box
      position="fixed"
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
          opacity="0.3"
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

import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import type { ProjectStat } from '@/lib/projects';

/** 代表作の実績の数字と、掲載している作品の数を横一列に並べる */
export function StatsBand({
  stats,
  projectCount,
}: {
  stats: ProjectStat[];
  projectCount: number;
}) {
  const items = [
    ...stats,
    { value: String(projectCount), label: '掲載している作品' },
  ];

  return (
    <Box borderYWidth="1px" borderColor="border">
      <SimpleGrid
        as="ul"
        listStyleType="none"
        columns={items.length}
        maxW="6xl"
        mx="auto"
      >
        {items.map((item, i) => (
          <Box
            as="li"
            key={item.label}
            px={{ base: '4', md: '6' }}
            py={{ base: '5', md: '7' }}
            borderLeftWidth={i === 0 ? undefined : '1px'}
            borderColor="border"
            minW="0"
          >
            <Text
              // 等幅フォントだと桁区切りのカンマの前後が空くので、見出しの字で数字幅だけ揃える
              fontFamily="heading"
              fontWeight="black"
              fontSize={{ base: '2xl', md: '4xl' }}
              lineHeight="1.1"
              fontVariantNumeric="tabular-nums"
            >
              {item.value}
            </Text>
            <Text mt="1" fontSize={{ base: 'xs', md: 'sm' }} color="fg.muted">
              {item.label}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}

'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogPositioner,
  DialogRoot,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { LuX } from 'react-icons/lu';
import { Card } from '@/components/atoms/Card';

function ScreenshotFrame({
  src,
  alt,
  sizes,
  onClick,
}: {
  src: string;
  alt: string;
  sizes: string;
  onClick: () => void;
}) {
  return (
    <Card
      as="button"
      onClick={onClick}
      display="block"
      w="full"
      position="relative"
      overflow="hidden"
      aspectRatio={16 / 9}
      cursor="pointer"
      transition="opacity 0.2s ease-out"
      _hover={{ opacity: 0.85 }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        style={{ objectFit: 'cover' }}
      />
    </Card>
  );
}

export function ProjectScreenshot({
  label,
  images = [],
  alt,
}: {
  label: string;
  images?: string[];
  alt?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (images.length === 0) {
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
        <Text>{label}のスクリーンショット(準備中)</Text>
      </Card>
    );
  }

  const baseAlt = alt ?? `${label}のスクリーンショット`;
  const captions =
    images.length === 1
      ? [baseAlt]
      : images.map((_, i) => `${baseAlt} ${i + 1}`);

  return (
    <>
      {images.length === 1 ? (
        <ScreenshotFrame
          src={images[0]}
          alt={captions[0]}
          sizes="(min-width: 48em) 720px, 100vw"
          onClick={() => setOpenIndex(0)}
        />
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2 }} gap="4">
          {images.map((src, index) => (
            <ScreenshotFrame
              key={src}
              src={src}
              alt={captions[index]}
              sizes="(min-width: 48em) 360px, 100vw"
              onClick={() => setOpenIndex(index)}
            />
          ))}
        </SimpleGrid>
      )}

      <DialogRoot
        open={openIndex !== null}
        onOpenChange={(e) => !e.open && setOpenIndex(null)}
        size="xl"
        placement="center"
      >
        <DialogBackdrop />
        <DialogPositioner>
          <DialogContent>
            <DialogCloseTrigger
              position="absolute"
              top="2"
              insetEnd="2"
              zIndex="1"
              display="flex"
              alignItems="center"
              justifyContent="center"
              boxSize="8"
              borderRadius="full"
              bg="bg.panel"
              aria-label="閉じる"
            >
              <LuX />
            </DialogCloseTrigger>
            <DialogBody p="0">
              {openIndex !== null && (
                <Image
                  src={images[openIndex]}
                  alt={captions[openIndex]}
                  width={1600}
                  height={900}
                  style={{ width: '100%', height: 'auto' }}
                />
              )}
            </DialogBody>
          </DialogContent>
        </DialogPositioner>
      </DialogRoot>
    </>
  );
}

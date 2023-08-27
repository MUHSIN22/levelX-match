import { SimpleGrid, Skeleton, VStack } from '@chakra-ui/react';

export default function PickPlayerTabSkeleton() {
  return (
    <VStack w='100%'>
      <SimpleGrid
        columns={4}
        gap={2}
        w='100%'
      >
        <Skeleton
          h='3rem'
          w='100%'
        />
        <Skeleton
          h='3rem'
          w='100%'
        />
        <Skeleton
          h='3rem'
          w='100%'
        />
        <Skeleton
          h='3rem'
          w='100%'
        />
      </SimpleGrid>
      <Skeleton
        w='100%'
        h='10rem'
      />
    </VStack>
  );
}

import { Badge, Text, VStack } from '@chakra-ui/react';
import PropTypes, { InferProps } from 'prop-types';

export default function TeamCard({
  captain,
  viceCaptain
}: InferProps<typeof TeamCard.propTypes>) {
  
  return (
    <VStack
      alignItems='flex-start'
      gap={0}
      w='100%'
      border='2px solid black'
      p={4}
    >
      <Text variant='big'>Team</Text>
      <Text>
        {captain} <Badge>C</Badge>
      </Text>
      <Text>
        {viceCaptain} <Badge>VC</Badge>
      </Text>
    </VStack>
  );
}

/* The code `TeamCard.propTypes` is defining the prop types for the `TeamCard` component. It specifies
that the `captain` prop should be a required string and the `viceCaptain` prop should also be a
required string. This helps to enforce type checking and ensure that the correct types of props are
passed to the component. */
TeamCard.propTypes = {
  captain: PropTypes.string.isRequired,
  viceCaptain: PropTypes.string.isRequired
};

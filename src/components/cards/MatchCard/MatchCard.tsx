import { Flex, Image, Text, VStack } from '@chakra-ui/react';
import { InferProps } from 'prop-types';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function MatchCard({
  id,
  ATeam,
  BTeam,
  eventName
}: InferProps<typeof MatchCard.propTypes>) {
 
  const navigate = useNavigate();
  
  return (
    <Flex
      border='2px solid black'
      w='100%'
      p={2}
      justifyContent='space-between'
      alignItems='center'
      cursor='pointer'
      onClick={() => navigate(`/teams/${id}`)}
    >
      <Image
        src={ATeam?.image}
        w='3rem'
        h='auto'
      />
      <VStack>
        <Text variant='regular'>{eventName}</Text>
        <Text
          variant='big'
          fontWeight={700}
        >
          {ATeam?.name} <span style={{ fontWeight: 400 }}>VS</span>{' '}
          {BTeam?.name}
        </Text>
      </VStack>
      <Image
        src={BTeam?.image}
        w='3rem'
        h='auto'
      />
    </Flex>
  );
}

// Types of the props
MatchCard.propTypes = {
  id: PropTypes.number.isRequired,
  ATeam: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  }),
  BTeam: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  }),
  eventName: PropTypes.string.isRequired
};

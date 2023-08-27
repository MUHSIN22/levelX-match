import { Heading, VStack } from '@chakra-ui/react';
import useAppSelector from '../../hooks/useAppSelector/useAppSelector';
import MatchCardSkeleton from '../../components/skeletons/cards/MatchCard/MatchCardSkeleton';
import MatchCard from '../../components/cards/MatchCard/MatchCard';

export default function UpcomingMatches() {
  const { loading, matches } = useAppSelector((state) => state.root);

  return (
    <VStack h='100%' w='100%'>
      <Heading>Upcoming Matches</Heading>
      
      <VStack w='100%'>
        {loading === 'matches' ? (
          <MatchCardSkeleton />
        ) : (
          matches?.map((match) => (
            <MatchCard
              key={match.id}
              eventName={match.eventName}
              id={match.id}
              ATeam={match.ATeam}
              BTeam={match.BTeam}
            />
          ))
        )}
      </VStack>

    </VStack>
  );
}

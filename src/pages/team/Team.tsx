import { Button, Text, VStack } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addCurrentTeam } from '../../features/root/rootSlice';
import { useMemo, useState } from 'react';
import useAppSelector from '../../hooks/useAppSelector/useAppSelector';
import { IMatch } from '../../types/features/root.types';
import TeamCard from '../../components/cards/TeamCard/TeamCard';

export default function Team() {
  // Common Hooks----------------------------------
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  // States ---------------------------------------
  const [match, setMatch] = useState<IMatch | null>(null);
  const { matches, teams } = useAppSelector((state) => state.root);

  /**
   * The handleAddTeam function dispatches an action to add the current team with a random UUID and
   * navigates to the pick-players page with the given ID.
   */
  const handleAddTeam = () => {
    dispatch(addCurrentTeam(crypto.randomUUID()));
    navigate(`/pick-players/${id}`);
  };

  /* The `useMemo` hook is used to memoize the result of a computation. In this case, it is used to
  update the `match` state variable whenever the `matches` or `id` dependencies change. */
  useMemo(() => {
    if (matches) {
      const selectedMatch = matches?.filter((item) => item.id == (id || 0))[0];
      setMatch(selectedMatch);
    }
  }, [matches, id]);
  return (
    <VStack w='100%'>
      <Text
        variant='big'
        fontWeight={700}
      >
        {match?.ATeam.name} <span>vs</span> {match?.BTeam.name}
      </Text>
      <Text
        variant='big'
        fontWeight={700}
        textAlign='left'
        w='100%'
      >
        My Team
      </Text>

      <VStack w='100%'>
        {Object.keys(teams).map((key) => {
          return teams[key].map((team, index) => (
            <TeamCard
              key={index}
              captain={
                team.players.filter(
                  (player) => player.playerID === team.captain
                )[0].name
              }
              viceCaptain={
                team.players.filter(
                  (player) => player.playerID === team.viceCaptain
                )[0].name
              }
            />
          ));
        })}
      </VStack>

      <Button
        w='100%'
        colorScheme='green'
        mt='auto'
        onClick={handleAddTeam}
      >
        Add New Team
      </Button>
    </VStack>
  );
}

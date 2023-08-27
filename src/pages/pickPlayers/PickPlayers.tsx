import { Button, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import useAppSelector from '../../hooks/useAppSelector/useAppSelector';
import PickPlayerTabSkeleton from '../../components/skeletons/pickPlayerTabSkeleton/PickPlayerTabSkeleton';
import { IMatch, IPlayer } from '../../types/features/root.types';
import PickPlayerTabs from '../../components/tabs/pickPlayerTabs/PickPlayerTabs';
import { useNavigate, useParams } from 'react-router-dom';
import { addCounts } from '../../features/root/rootSlice';
import { useDispatch } from 'react-redux';
import useCustomToast from '../../hooks/useCustomToast/useCustomToast';

type IStructuredPlayer = {
  wk: IPlayer[];
  ar: IPlayer[];
  bowl: IPlayer[];
  bat: IPlayer[];
};

export default function PickPlayers() {
  // Common Hooks----------------------------------
  const { id } = useParams();
  const dispatch = useDispatch();
  const toast = useCustomToast();
  const navigate = useNavigate();

  // States ---------------------------------------
  const [structuredPlayers, setStructuredPlayers] =
    useState<IStructuredPlayer>();

  const [counts, setCounts] = useState<{
    players: number;
    team1: number;
    team2: number;
    credits: number;
  }>({
    players: 0,
    team1: 0,
    team2: 0,
    credits: 100
  });
  const [match, setMatch] = useState<IMatch | null>(null);

  // Redux Selectors ----------------------------------
  const {
    selectedPlayers,
    counts: { bat, bowl, wk }
  } = useAppSelector((state) => state.root);

  const { matches, loading, players } = useAppSelector((state) => state.root);

  /**
   * The function "handleProceed" checks if the user has selected the required number of batsmen,
   * wicket keepers, and bowlers, and displays an error message if any requirements are not met. If
   * there are no errors, it navigates to a different page.
   * @returns If there are any errors, the function will return false. Otherwise, it will navigate to
   * the `/select-captain/` route.
   */
  const handleProceed = () => {
    const errors: string[] = [];
    if (bat < 3) {
      errors.push('You need to select atleast 3 Batsman');
    }
    if (wk < 1) {
      errors.push('You need to select atleast 1 wicket keeper');
    }
    if (bowl < 3) {
      errors.push('You need to select atleast 3 Bowlers');
    }
    if (errors.length > 0) {
      errors.forEach((error) => {
        toast('Ugh no!', error, 'error');
      });
      return false;
    }
    navigate(`/select-captain/${id}`);
  };

  //   Function for structuring the players data
  const structurePlayers = (data: IPlayer[]) => {
    const bat = [];
    const wk = [];
    const ar = [];
    const bowl = [];

    for (let i = 0; i < data?.length; i++) {
      const item = data[i];
      switch (item.role) {
        case 'Bowler':
          bowl.push(item);
          break;
        case 'All-Rounder':
          ar.push(item);
          break;
        case 'Batsman':
          bat.push(item);
          break;
        case 'Wicket-Keeper':
          wk.push(item);
          break;
        default:
          break;
      }
      setStructuredPlayers({
        bat,
        wk,
        ar,
        bowl
      });
    }
  };

  useMemo(() => {
    if (players) {
      structurePlayers(players);
    }
  }, [players]);

  useMemo(() => {
    if (selectedPlayers) {
      let totalCredit = 0;

      for (let i = 0; i < selectedPlayers.length; i++) {
        const item = selectedPlayers[i];
        totalCredit += item.eventPlayerCredit;
      }

      setCounts({
        players: selectedPlayers.length,
        team1: selectedPlayers.filter((item) => item.teamID === match?.ATeam.id)
          .length,
        team2: selectedPlayers.filter((item) => item.teamID === match?.BTeam.id)
          .length,
        credits: 100 - totalCredit
      });
    }
  }, [selectedPlayers, id, matches, match]);

  useMemo(() => {
    if (selectedPlayers) {
      let totalCredit = 0;

      const bowl = selectedPlayers.filter(
        (player) => player.role === 'Bowler'
      ).length;

      const ar = selectedPlayers.filter(
        (player) => player.role === 'All-Rounder'
      ).length;

      const wk = selectedPlayers.filter(
        (player) => player.role === 'Wicket-Keeper'
      ).length;

      const bat = selectedPlayers.filter(
        (player) => player.role === 'Batsman'
      ).length;

      for (let i = 0; i < selectedPlayers.length; i++) {
        const item = selectedPlayers[i];
        totalCredit += item.eventPlayerCredit;
      }
      dispatch(addCounts({ ar, wk, bowl, bat, credits: totalCredit }));
    }
  }, [selectedPlayers, dispatch]);

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
        Pick Team1
      </Text>

      {loading === 'players' || !structuredPlayers ? (
        <PickPlayerTabSkeleton />
      ) : (
        <PickPlayerTabs playerData={structuredPlayers} />
      )}

      <Button
        w='100%'
        colorScheme='green'
        mt='auto'
        onClick={handleProceed}
      >
        Proceed
      </Button>

      <SimpleGrid
        columns={4}
        w='100%'
      >
        <VStack
          border='2px solid black'
          p={2}
          gap={0}
        >
          <Text variant='regular'>{counts.players}/11</Text>
          <Text
            variant='regular'
            fontWeight={600}
          >
            Players
          </Text>
        </VStack>

        <VStack
          border='2px solid black'
          borderLeft='none'
          p={2}
          gap={0}
        >
          <Text variant='regular'>{counts.team1}</Text>
          <Text
            variant='regular'
            fontWeight={600}
          >
            {match?.ATeam.name}
          </Text>
        </VStack>

        <VStack
          border='2px solid black'
          borderLeft='none'
          p={2}
          gap={0}
        >
          <Text variant='regular'>{counts.team2}</Text>
          <Text
            variant='regular'
            fontWeight={600}
          >
            {match?.BTeam.name}
          </Text>
        </VStack>

        <VStack
          border='2px solid black'
          borderLeft='none'
          p={2}
          gap={0}
        >
          <Text variant='regular'>{counts.credits}</Text>
          <Text
            variant='regular'
            fontWeight={600}
          >
            Cr Left
          </Text>
        </VStack>

      </SimpleGrid>
      
    </VStack>
  );
}

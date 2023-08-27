import { Button, VStack } from '@chakra-ui/react';
import SelectCaptainTable from '../../components/tables/selectCaptainTable/SelectCaptainTable';
import { useEffect, useState } from 'react';
import useCustomToast from '../../hooks/useCustomToast/useCustomToast';
import { useNavigate, useParams } from 'react-router-dom';
import useAppSelector from '../../hooks/useAppSelector/useAppSelector';
import useAppDispatch from '../../hooks/useAppDispatch/useAppDispatch';
import { addPlayer, addTeams } from '../../features/root/rootSlice';

export default function SelectCaptain() {
  // Common Hooks----------------------------------
  const toast = useCustomToast();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  // States ---------------------------------------
  const [captain, setCaptain] = useState<number | null>(null);
  const [viceCaptain, setViceCaptain] = useState<number | null>(null);

  // Redux Selectors ----------------------------------
  const { teams, selectedPlayers } = useAppSelector((state) => state.root);

  /**
   * The function handles saving teams by checking if a captain and vice captain are selected, creating
   * a new team object, saving it to local storage, dispatching actions, navigating to a new page, and
   * displaying a success toast message.
   * @returns The function handleSaving returns a boolean value. If either the captain or viceCaptain
   * is not selected, it returns false. Otherwise, it returns true.
   */
  const handleSaving = () => {
    if (!captain) {
      toast('Ugh no!', 'Please select a captain', 'error');
      return false;
    }
    if (!viceCaptain) {
      toast('Ugh no!', 'Please select a vice captain', 'error');
      return false;
    }
    const newTeams = {
      ...teams
    };
    newTeams[id as string] = newTeams[id as string]
      ? [
          ...newTeams[id as string],
          {
            captain,
            viceCaptain,
            players: selectedPlayers
          }
        ]
      : [
          {
            captain,
            viceCaptain,
            players: selectedPlayers
          }
        ];

    localStorage.setItem('teams', JSON.stringify(newTeams));
    dispatch(addTeams(newTeams));
    dispatch(addPlayer([]));
    navigate(`/teams/${id}`);
    toast('Great', 'Teams saved successfully', 'success');
  };

  /* The `useEffect` hook is used to perform side effects in a React component. In this case, the
  `useEffect` hook is used to navigate to a different page if the `selectedPlayers` array is empty. */
  useEffect(() => {
    if (selectedPlayers?.length === 0) {
      navigate(`/teams/${id}`);
    }
  }, [selectedPlayers, id, navigate]);
  return (
    <VStack>
      <SelectCaptainTable
        captain={captain}
        setCaptain={setCaptain}
        viceCaptain={viceCaptain}
        setViceCaptain={setViceCaptain}
      />
      <Button
        colorScheme='green'
        w='100%'
        mt='auto'
        onClick={handleSaving}
      >
        Save Team
      </Button>
    </VStack>
  );
}

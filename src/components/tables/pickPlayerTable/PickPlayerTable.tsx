import {
  Checkbox,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
import PropTypes, { InferProps } from 'prop-types';
import useAppDispatch from '../../../hooks/useAppDispatch/useAppDispatch';
import { addPlayer } from '../../../features/root/rootSlice';
import { IPlayer } from '../../../types/features/root.types';
import useAppSelector from '../../../hooks/useAppSelector/useAppSelector';
import useCustomToast from '../../../hooks/useCustomToast/useCustomToast';

export default function PickPlayerTable({
  max,
  data
}: InferProps<typeof PickPlayerTable.propTypes>) {
  // Common Hooks----------------------------------
  const dispatch = useAppDispatch();
  const toast = useCustomToast();
  
// Redux Selectors ----------------------------------
  const {
    selectedPlayers,
    counts: { credits }
  } = useAppSelector((state) => state.root);

  /**
   * The function handles the selection and deselection of players in a game, considering various
   * conditions such as maximum number of players, maximum number of players of a specific role, and
   * total credits.
   * @param {IPlayer} player - The `player` parameter is an object of type `IPlayer`.
   * @returns a boolean value.
   */
  const handlePlayer = (player: IPlayer) => {
    let selectedList = [...selectedPlayers];

    const filteredLength = selectedList.filter(
      (item) => item.role === data[0]?.role
    ).length;

    if (selectedList.includes(player)) {
      selectedList = selectedList.filter((item) => item !== player);
    } else {
      if (selectedList.length >= 11) {
        toast('Ugh no!', 'Max 11 players are allowed', 'error');
        return false;
      } else if (filteredLength >= max) {
        toast(
          'Ugh no!',
          `Max ${max} ${data[0]?.role} players are allowed`,
          'error'
        );
        return false;
      } else if (credits + player.eventPlayerCredit > 100) {
        toast('Ugh no!', `Total credits should not exceed 100`, 'error');
        return false;
      }

      selectedList = [...selectedList, player];
    }
    dispatch(addPlayer(selectedList));
  };

  return (
    <TableContainer w='100%'>
      <Table
        variant='simple'
        w='100%'
        size='sm'
      >
        <Thead>
          <Tr>
            <Th>Select</Th>
            <Th>Players</Th>
            <Th>Points</Th>
            <Th>Cr</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => (
            <Tr
              key={item?.playerID}
              _hover={{
                bg: 'rgba(0,0,0,0.1)',
                cursor: 'pointer'
              }}
              onClick={() => handlePlayer(item as IPlayer)}
            >
              <Td>
                <Checkbox
                  isChecked={selectedPlayers.includes(item as IPlayer)}
                />
              </Td>
              <Td>{item?.name}</Td>
              <Td>{item?.eventTotalPoints}</Td>
              <Td>{item?.eventPlayerCredit}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

PickPlayerTable.propTypes = {
  max: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      teamID: PropTypes.number.isRequired,
      playerID: PropTypes.number.isRequired,
      role: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      eventPlayerCredit: PropTypes.number.isRequired,
      eventTotalPoints: PropTypes.number.isRequired
    })
  ).isRequired
};

import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
import useAppSelector from '../../../hooks/useAppSelector/useAppSelector';
import PropTypes, { InferProps } from 'prop-types';

export default function SelectCaptainTable({
  captain,
  setCaptain,
  viceCaptain,
  setViceCaptain
}: InferProps<typeof SelectCaptainTable.propTypes>) {
  const { selectedPlayers } = useAppSelector((state) => state.root);

  /**
   * The function `handleSelection` takes in a type and an id, and based on the type, sets the captain
   * or vice captain id.
   * @param {'c' | 'vc'} type - The `type` parameter is a string that can have two possible values: 'c'
   * or 'vc'.
   * @param {number} id - The `id` parameter is a number that represents the identifier of a captain or
   * vice captain.
   */
  const handleSelection = (type: 'c' | 'vc', id: number) => {
    switch (type) {
      case 'c':
        setCaptain(id);
        break;
      case 'vc':
        setViceCaptain(id);
        break;
      default:
        break;
    }
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
            <Th>Players</Th>
            <Th>Points</Th>
            <Th>Cr</Th>
          </Tr>
        </Thead>
        <Tbody>
          {selectedPlayers.map((item) => (
            <Tr
              key={item?.playerID}
              _hover={{
                bg: 'rgba(0,0,0,0.1)',
                cursor: 'pointer'
              }}
            >
              <Td>{item?.name}</Td>
              <Td>{item?.eventTotalPoints}</Td>
              <Td>{item?.eventPlayerCredit}</Td>
              <Td>
                <Button
                  colorScheme={captain === item.playerID ? 'green' : 'telegram'}
                  onClick={() => handleSelection('c', item.playerID)}
                >
                  C
                </Button>
              </Td>
              <Td>
                <Button
                  colorScheme={
                    viceCaptain === item.playerID ? 'green' : 'telegram'
                  }
                  onClick={() => handleSelection('vc', item.playerID)}
                >
                  VC
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

SelectCaptainTable.propTypes = {
  captain: PropTypes.any.isRequired,
  viceCaptain: PropTypes.any.isRequired,
  setCaptain: PropTypes.func.isRequired,
  setViceCaptain: PropTypes.func.isRequired
};

import { Center, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import useFetchAPI from '../../hooks/useFetchAPI/useFetchAPI';
import { filterMatchList } from '../../utils/APIDataFilters/filterMatchList';
import { filterPlayersList } from '../../utils/APIDataFilters/filterPlayersList';

export default function MainLayout() {
  useFetchAPI(
    'root',
    'matches',
    'Get_All_upcoming_Matches.json',
    filterMatchList
  );

  useFetchAPI(
    'root',
    'players',
    'Get_All_Players_of_match.json',
    filterPlayersList
  );

  return (
    <Center
      w='100%'
      bg='gray'
    >
      <Flex
        p={4}
        maxW='500px'
        minH='100svh'
        w='100%'
        bg='white'
        alignItems='stretch'
      >
        <Outlet />
      </Flex>
    </Center>
  );
}

import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack
} from '@chakra-ui/react';
import PropTypes, { InferProps } from 'prop-types';
import PickPlayerTable from '../../tables/pickPlayerTable/PickPlayerTable';

export default function PickPlayerTabs({
  playerData
}: InferProps<typeof PickPlayerTabs.propTypes>) {
  return (
    <Tabs
      variant='enclosed'
      w='100%'
    >
      <TabList>
        <Tab fontSize='xs'>BAT({playerData?.bat?.length})</Tab>
        <Tab fontSize='xs'>WK({playerData?.wk?.length})</Tab>
        <Tab fontSize='xs'>AR({playerData?.ar?.length})</Tab>
        <Tab fontSize='xs'>BOWL({playerData?.bowl?.length})</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <VStack>
            <Text
              variant='regular'
              w='100%'
              textAlign='left'
            >
              Pick 3-7 Batsman
            </Text>
            <PickPlayerTable
              max={7}
              data={playerData?.bat || []}
            />
          </VStack>
        </TabPanel>
        <TabPanel>
          <VStack>
            <Text
              variant='regular'
              w='100%'
              textAlign='left'
            >
              1-5 Wicket keepers
            </Text>
            <PickPlayerTable
              max={5}
              data={playerData?.wk || []}
            />
          </VStack>
        </TabPanel>
        <TabPanel>
          <VStack>
            <Text
              variant='regular'
              w='100%'
              textAlign='left'
            >
              0-4 All Rounders
            </Text>
            <PickPlayerTable
              max={4}
              data={playerData?.ar || []}
            />
          </VStack>
        </TabPanel>
        <TabPanel>
          <VStack>
            <Text
              variant='regular'
              w='100%'
              textAlign='left'
            >
              Pick 3-7 Bowlers
            </Text>
            <PickPlayerTable
              max={7}
              data={playerData?.bowl || []}
            />
          </VStack>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

const playerStructure = PropTypes.arrayOf(
  PropTypes.shape({
    teamID: PropTypes.number.isRequired,
    playerID: PropTypes.number.isRequired,
    role: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    eventPlayerCredit: PropTypes.number.isRequired,
    eventTotalPoints: PropTypes.number.isRequired,
    teamShortName: PropTypes.string.isRequired
  })
);

PickPlayerTabs.propTypes = {
  playerData: PropTypes.shape({
    bat: playerStructure.isRequired,
    wk: playerStructure.isRequired,
    ar: playerStructure.isRequired,
    bowl: playerStructure.isRequired
  })
};

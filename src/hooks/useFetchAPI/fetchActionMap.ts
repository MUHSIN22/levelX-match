import { fetchRootAPI } from '../../features/root/rootAction';

const fetchActionsMap: { [key: string]: typeof fetchRootAPI } = {
  root: fetchRootAPI
};

export default fetchActionsMap;

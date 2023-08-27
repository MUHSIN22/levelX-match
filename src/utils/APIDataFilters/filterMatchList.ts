import { IMatch } from '../../types/features/root.types';

/**
 * The function `filterMatchList` takes in a data object containing a list of cricket matches and
 * returns a filtered list of matches with specific properties.
 * @param data - The `data` parameter is an object that contains a property called `matches`, which is
 * an object that contains a property called `cricket`. The `cricket` property is an array of objects,
 * where each object represents a cricket match.
 * @returns an array of objects of type IMatch.
 */
export const filterMatchList = (data: {
  matches: { cricket: { [key: string]: any } };
}): IMatch[] => {
  const filteredData: IMatch[] = data.matches.cricket.map((item:any) => ({
    id: item.id,
    ATeam: {
      id: item.team_a_id,
      name: item.t1_short_name,
      image: item.t1_image
    },
    BTeam: {
      id: item.team_b_id,
      name: item.t2_short_name,
      image: item.t2_image
    },
    matchName: item.match_name,
    eventName: item.event_name
  }));

  return filteredData;
};

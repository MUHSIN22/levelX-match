import { IPlayer } from "../../types/features/root.types";

/**
 * The function filters a list of players by extracting specific properties from each item and
 * returning a new array of filtered player objects.
 * @param {{ [key: string]: any }[]} data - The `data` parameter is an array of objects. Each object
 * represents a player and contains the following properties:
 * @returns a filtered array of objects of type `IPlayer`.
 */
export const filterPlayersList = (data: { [key: string]: any }[]) => {
    
  const filteredData: IPlayer[] = data.map((item: any) => ({
    teamID: item.team_id,
    playerID: parseInt(item.player_id),
    role: item.role,
    name: item.name,
    eventPlayerCredit: item.event_player_credit,
    eventTotalPoints: item.event_total_points,
    teamShortName: item.team_short_name
  }));

  return filteredData;
}

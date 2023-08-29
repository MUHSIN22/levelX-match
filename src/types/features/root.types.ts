// Type of the initial state of the root
export type IRootState = {
    loading: IRootStateField | null;
    error: string | null;
    matches: IMatch[] | null;
    players: IPlayer[] | null;
    selectedPlayers: IPlayer[];
    counts: {
        bowl: number,
        ar: number,
        wk: number,
        bat: number,
        credits: number
    },
    currentTeam: string | null;
    teams: {
        [key: string | number] :  {
            captain: number,
            viceCaptain: number,
            players: IPlayer[]
        }[]
    }
}

export type IRootStateField = 'players' | 'matches'

// Type of the payload of Fetch function (AsyncThunk)
export type IFetchRootActionPayload = {
    endPoint: string,
    stateField: IRootStateField,
    filterFunction?: IFilterFunction;
}

// Type of the function for filtering the data from API
export type IFilterFunction =  (data: any) => IMatch[] | IPlayer[]

// Type of the return of the FetchRootAPI (AsyncThunk) function
export type IFetchRootAPIReturn = (
    {
        stateField: 'players',
        data: IPlayer[];
    }
    | 
    {
        stateField: 'matches',
        data: IMatch[];
    }
)

// Type of the match object through out the app. We can add new fields in future as per needs
export type IMatch = {
    id: number,
    ATeam:ITeam,
    BTeam:ITeam,
    matchName: string,
    eventName: string,
}

// Type of the teamObject > Which is using in the Match
export type ITeam = {
    id: number,
    name: string,
    image: string;
}

// Type of the player object throught out the app. We can add new fields in future as per needs
export type IPlayer = {
    teamID: number,
    playerID: number,
    role: string,
    name: string,
    eventPlayerCredit: number;
    eventTotalPoints: number;
    teamShortName: string;
}
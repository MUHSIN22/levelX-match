import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IFetchRootAPIReturn, IFetchRootActionPayload, IMatch, IPlayer, IRootState } from "../../types/features/root.types";
import { fetchRootAPI } from "./rootAction";

const savedTeams = localStorage.getItem('teams') || '{}'

const initialState:IRootState = {
    loading: null,
    error: null,
    matches: null,
    players: null,
    selectedPlayers: [],
    counts: {
        bowl: 0,
        ar: 0,
        wk: 0,
        bat: 0,
        credits: 0
    },
    currentTeam: null,
    teams: JSON.parse(savedTeams)
}

const rootSlice = createSlice({
    initialState,
    name: 'root',
    reducers:{
        addPlayer: (state: IRootState, {payload}: {payload: IPlayer[]}) => {
            state.selectedPlayers = payload;
        },
        addCounts: (state: IRootState, {payload} : {payload: {bowl: number, ar: number, wk: number, bat: number, credits: number}}) => {
            state.counts.ar = payload.ar,
            state.counts.bat = payload.bat,
            state.counts.bowl = payload.bowl,
            state.counts.wk = payload.wk,
            state.counts.credits = payload.credits
        },
        addCurrentTeam: (state: IRootState, {payload} : {payload: string}) => {
            state.currentTeam = payload
        },
        addTeams : (state:IRootState, {payload}: {payload: any}) => {
            state.teams = payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRootAPI.pending, (state:IRootState,{meta:{arg}}: {meta:{arg: IFetchRootActionPayload}}) => {
                state.loading = arg.stateField;
            })
            .addCase(fetchRootAPI.fulfilled, (state:IRootState, {payload}:{payload: IFetchRootAPIReturn}) => {
                state.error = null;
                state.loading = null;
                switch(payload.stateField){
                    case 'matches':
                        state.matches = payload.data as IMatch[];
                        break;
                    case 'players':
                        state.players = payload.data as IPlayer[];
                        break;
                    default:
                         break;
                }
            })
            .addCase(fetchRootAPI.rejected, (state:IRootState, {payload}:PayloadAction<any>) => {
                state.error = payload;
                state.loading = null;
            })
    }
})


export const {addPlayer, addCounts, addCurrentTeam, addTeams} = rootSlice.actions;
export default rootSlice.reducer;
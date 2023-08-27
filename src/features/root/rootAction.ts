import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../app/axiosInstance";
import { IFetchRootAPIReturn, IFetchRootActionPayload } from "../../types/features/root.types";

/* The code is defining and exporting an asynchronous thunk function called `fetchRootAPI`. */
export const fetchRootAPI = createAsyncThunk<
    IFetchRootAPIReturn,
    IFetchRootActionPayload
>('root/fetch-root-api',async (payload, {rejectWithValue}) => {
   try{
    const {data} = await axiosInstance.get(payload.endPoint);
    
    const filteredData = payload.filterFunction ? payload.filterFunction(data) : data;
    return {
        stateField: payload.stateField,
        data: filteredData
    }
   }catch(error: any){
    return rejectWithValue({
        message: error.message
    })
   } 
})
import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//Dont forget to replace these imported MockAPI functions with real ones.
import {getUser} from './mockAPI';

// The Global State Logic of the app. Implemented with React Redux and Redux Toolkit

// ===================
//      Actions
// ===================

export const fetchUserData = createAsyncThunk(
    'userData/FetchUserData',
    async (username) => {
        return await getUser(username); //Replace this with a real API function
    }
);

// ===================
// Global State Slices
// ===================

// The 'slice' or part of the global state handling the global user state
export const userDataSlice = createSlice(
    {
        name: 'userData',
        initialState: {
            userInfo: {},
            isLoadingUser: false,
            failedToLoadUser: false
        },
        extraReducers: {
            [fetchUserData.pending]: (state) => {
                state.isLoadingUser = true;
                state.failedToLoadUser = false;
            },
            [fetchUserData.fulfilled]: (state, action) => {
                state.userInfo = action.payload;
                state.isLoadingUser = false;
                state.failedToLoadUser = false;
            },
            [fetchUserData.rejected]: (state) => {
                state.isLoadingUser = false;
                state.failedToLoadUser = true;
            }
        },
    });

    /*
// The 'slice' or part of the global state handling the global entries state
export const entriesDataSlice = createSlice(
    {
        name: 'entriesData',
        initialState: {},
        extraReducers: {},
    });
*/
// +++ The actual Global State +++
// This global state combines all the partial global stats called 'slices' into the final combined global state
export default configureStore(
    {
    reducer: {
                userData: userDataSlice.reducer,
                //entriesData: entriesDataSlice.reducer
             }
    });
import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        singleJob: null,
        searchJobResult: [],
        loading: false
    },
    reducers: {
        //actions
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setSearchJobResult: (state, action) => {
            state.searchJobResult = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
});

export const {setAllJobs, setSingleJob}= jobSlice.actions;
export default jobSlice.reducer;
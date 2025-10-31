import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        active: false,
        userData: null,
        loading: true,
    },
    reducers: {
        login: (state, action) => {
            state.active = true;
            state.userData = action.payload;              //if object is coming in payload fetch it like this don't just write action.payload
            state.loading = true;
        },

        logout: (state) => {
            state.active = false;
            state.userData = null;
        },

        setAuthLoading: (state,action) => {
            state.loading = action.payload;
        }

    }
})

export const {login, logout, setAuthLoading} = authSlice.actions;

export default authSlice.reducer;
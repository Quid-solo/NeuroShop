import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        active: false,
        userData: null,
    },
    reducers: {
        login: (state, action) => {
            state.active = true;
            state.userData = action.payload.userData;              //if object is coming in payload fetch it like this don't just write action.payload
        },

        logout: (state) => {
            state.active = false;
        },

    }
})

export const {login, logout, updateAddress, addOtherData} = authSlice.actions;

export default authSlice.reducer;
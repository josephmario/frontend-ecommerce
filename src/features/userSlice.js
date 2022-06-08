import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name:"user",

    initialState: {
        login: [{
          email: null,
          password: null,
          role: null,
          name: null,
          token: null,
          loggedIn: false,
        }]
    },
    
    reducers: {
       
       login: (state, action) => {
          state.login = action.payload
       },
       
       logout: (state) => {
         state.login = {
          email: null,
          password: null,
          role: null,
          name: null,
          token: null,
          loggedIn: false,
         }
       },

       

    }
})

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user.login;

export default userSlice.reducer;
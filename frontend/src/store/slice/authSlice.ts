import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {UserMe} from "../../model/auth/access-token-response";

export const initialState: UserMe = {
    id: '',
    email: '',
    isAdmin: false,
    username: ''
}

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
    setAuth(state, action: PayloadAction<UserMe>) {
        state.id = action.payload.id
        state.email = action.payload.email
        state.isAdmin = action.payload.isAdmin
        state.username = action.payload.username
    },
    setDefault(state) {
        state.id = initialState.id
        state.email = initialState.email
        state.isAdmin = initialState.isAdmin
        state.username = initialState.username
    }
  }
})

export const {setAuth, setDefault} = authSlice.actions;

export default authSlice.reducer;
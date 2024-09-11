import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from './slice/authSlice'

const rootReducer = combineReducers({
    auth: authReducer
})

const store = configureStore({reducer: rootReducer})

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = typeof store
export type AppDispatch = AppStore['dispatch']

export default store
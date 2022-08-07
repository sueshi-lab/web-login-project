import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { HOST } from '../../environment';
import axios from 'axios';

const authApi = `${HOST}/user/authen`
export const authUser = createAsyncThunk(
    'auth/currentUser',
    async (username, thunkAPI) => {

        const token = localStorage.getItem("token");
        const result = await axios.post(authApi, {}, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        return result.data
    }
)

const initialState = {
    user: null,
    isLogin: false,
    isLoading: true,
    isReject: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload
            state.isLogin = true
        },
        logout: (state) => {
            state.user = null
        },
    },
    extraReducers: {
        [authUser.pending]: (state) => {
            state.isLoading = true
            state.isReject = false
        },
        [authUser.fulfilled]: (state, action) => {
            state.isLoading = false
            state.user = action.payload.user
            state.isLogin = true
            state.isReject = false
        },
        [authUser.rejected]: (state, action) => {
            state.isLoading = false
            state.isLogin = false
            state.isReject = true
            localStorage.removeItem('token')
        },
    },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
export const selectCurrentUser = (state) => state.auth.user
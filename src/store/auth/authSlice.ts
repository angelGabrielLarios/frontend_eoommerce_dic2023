import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
    access_token: string,
    emailRecoveryPass: string
    tokenRecoveryPass: string
}

const initialState: AuthState = {
    access_token: localStorage.getItem('ecommerce_app_access_token') || ``,
    emailRecoveryPass: ``,
    tokenRecoveryPass: ``

}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken(state, action: PayloadAction<string>) {
            state.access_token = action.payload
            localStorage.setItem('ecommerce_app_access_token', state.access_token)
        },
        setEmailRecoveryPass(state, action: PayloadAction<string>) {
            state.emailRecoveryPass = action.payload
        },
        setTokenRecoveryPass: (state, action: PayloadAction<string>) => {
            state.tokenRecoveryPass = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setAccessToken, setEmailRecoveryPass, setTokenRecoveryPass } = authSlice.actions

export const authReducer = authSlice.reducer
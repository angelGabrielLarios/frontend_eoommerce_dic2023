import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const nameApp: string = `ecommerce_app_access_token`

export interface IProfile {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    iat: number;
}


export interface AuthState {
    access_token: string,
    idShoppingCart: string
    emailRecoveryPass: string
    tokenRecoveryPass: string
    profile: IProfile | null
}

const initialState: AuthState = JSON.parse(localStorage.getItem(nameApp) || `null`) || {
    access_token: ``,
    idShoppingCart: ``,
    emailRecoveryPass: ``,
    tokenRecoveryPass: ``,
    profile: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        setAccessToken(state, action: PayloadAction<string>) {
            state.access_token = action.payload
            localStorage.setItem(nameApp, JSON.stringify(state))
        },
        setEmailRecoveryPass(state, action: PayloadAction<string>) {
            state.emailRecoveryPass = action.payload
            localStorage.setItem(nameApp, JSON.stringify(state))
        },
        setTokenRecoveryPass: (state, action: PayloadAction<string>) => {
            state.tokenRecoveryPass = action.payload
            localStorage.setItem(nameApp, JSON.stringify(state))
        },
        setIdShoppingCart: (state, action: PayloadAction<{ idShoppingCart: string }>) => {
            state.idShoppingCart = action.payload.idShoppingCart
            localStorage.setItem(nameApp, JSON.stringify(state))
        },
        setProfile: (state, action: PayloadAction<{ profile: IProfile | null }>) => {
            state.profile = action.payload.profile
            localStorage.setItem(nameApp, JSON.stringify(state))
        }
    },
})

// Action creators are generated for each case reducer function
export const { setAccessToken, setEmailRecoveryPass, setTokenRecoveryPass, setIdShoppingCart, setProfile } = authSlice.actions

export const authReducer = authSlice.reducer
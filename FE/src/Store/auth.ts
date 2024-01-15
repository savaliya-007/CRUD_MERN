import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface authState {
  token: string  | null;
}

const initialState: authState = {
  token: null,
}

export const authSlice = createSlice({
  name: 'auth1',
  initialState,
  reducers: {
    setToken: (state,action: PayloadAction<string|null>) => {
      localStorage.setItem('auth',JSON.stringify(action.payload));
      state.token = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setToken  } = authSlice.actions

export default authSlice.reducer
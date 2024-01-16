import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface authState {
  token: string  | null;
  timerId: number |null;
}

const initialState: authState = {
  token: null,
  timerId: null,
}

export const authSlice = createSlice({
  name: 'auth1',
  initialState,
  reducers: {
    setToken: (state,action: PayloadAction<string|null>) => {
      if(action.payload){
        localStorage.setItem('auth',action.payload);
      }
      state.token = action.payload;  
      console.log('state.timerId', state.timerId) 
      if(state.timerId){
        clearTimeout(state.timerId);
      }
      state.timerId = setTimeout(() =>{ 
         localStorage.removeItem('auth');
         window.location.reload(); 
      },200000);
    },
  },
})

// Action creators are generated for each case reducer function
export const { setToken  } = authSlice.actions

export default authSlice.reducer
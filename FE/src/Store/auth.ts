import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface authState {
  token: string  | null;
  timerId: number |null;
  role: "admin" | "user" | null,

}

const initialState: authState = {
  token: null,
  timerId: null,
  role: null,
}

export const authSlice = createSlice({
  name: 'auth1',
  initialState,
  reducers: {
    setToken: (state,action: PayloadAction<{token :string, role: boolean}>) => {
      console.log('action.payload', action.payload)
        localStorage.setItem('auth',action.payload.token);
        localStorage.setItem('role',action.payload.role ? "admin" : "user");
      
      state.token = action.payload.token;
      state.role = action.payload.role ? "admin" : "user";  
      if(state.timerId){
        clearTimeout(state.timerId);
      }

      
      state.timerId = setTimeout(() =>{ 
         localStorage.removeItem('auth');
         localStorage.removeItem('role');
         window.location.reload(); 
      }, 200000);


    },
  },
})

// Action creators are generated for each case reducer function
export const { setToken  } = authSlice.actions

export default authSlice.reducer
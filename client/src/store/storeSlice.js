import { createSlice } from '@reduxjs/toolkit'

export const storeSlice = createSlice({
  name: 'appStore',
  initialState: {
    isLoggedIn: true,
    userId: null,
    userPic: null,
    token: null,
    login: () => {},
    logout: () => {},
  },
  reducers: {
    increment: state => {
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    }
  }
})

export const storeActions = storeSlice.actions

export default storeSlice.reducer
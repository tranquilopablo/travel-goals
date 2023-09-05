import { configureStore } from '@reduxjs/toolkit';

import storeReducer from "./storeSlice"



const store = configureStore({
  reducer: { appStore: storeReducer },
});


export default store




// utility redux store 
// import { useDispatch } from 'react-redux';
// import { storeActions } from './storeSlice';

// in function component
// const dispatch = useDispatch();

// in any function for example toggle 
// dispatch(storeActions.decrement())
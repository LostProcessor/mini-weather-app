import { configureStore } from '@reduxjs/toolkit';
import  citySlice  from './Slices/citySlice.js'; // Correctly import the default reducer

export const store = configureStore({
    reducer: {
        city: citySlice.reducer,
    },
});

export default store
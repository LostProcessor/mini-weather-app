import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    city: 'Paris',
    weather: [],
}
const citySlice = createSlice({
    name: 'city',
    initialState: initialState,
    reducers: {
        addCity(state, action) {
            state.city = action.payload;
        },
        get_weather_city(state, action) {
            state.weather = action.payload

        },
    },
});

export const { addCity, get_weather_city } = citySlice.actions;
export default citySlice

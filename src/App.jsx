import { useState, useEffect } from 'react';
import './App.css';
import TodaysWeather from './components/TodaysWeather.jsx';
import SearchComponent from './components/Searchcomponent.jsx';
import axios from 'axios';
import { get_weather_city } from './redux/slices/citySlice.js';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TwoDaysFromNow from './components/TwoDaysFromNow.jsx';
import TommorowsWeather from './components/Tommorrow.jsx';

function App() {
    const dispatch = useDispatch();
    const city = useSelector((state) => state.city.city);

    const fetchData = async () => {
        try {
            
            const response = await axios.get(
                `http://api.weatherapi.com/v1/forecast.json?key=12d4d587372b49cda31134835242111&q=${city}&days=3`
            );
            dispatch(get_weather_city(response.data.forecast.forecastday));
        } catch (error) {
            console.log('Error fetching weather data:', error);
        }
    };

    useEffect(() => {
        if (city) {
            fetchData();
        }
    }, [city]);

    return (
        <Router>
            <>
                <SearchComponent />
                <Routes>
                    <Route path="/today" element={<TodaysWeather />} />
                    <Route path="/TommorowsWeather" element={<TommorowsWeather />} />
                    <Route path="/TwoDaysFromNow" element={<TwoDaysFromNow />} />
                </Routes>
            </>
        </Router>
    );
}

export default App;

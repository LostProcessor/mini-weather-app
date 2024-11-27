import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Sun from '../assets/sun-159392_640.png';
import Rain from '../assets/rain_weather_icon_151998.png';
import Clouds from '../assets/clouds.png';
import Snow from '../assets/snow_cloud_weather_2787.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { get_weather_city } from '../redux/slices/citySlice';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom'
import { WiDegrees } from "react-icons/wi";
import Mist from '../assets/mist.jpg'
import Bottom from './Bottom.jsx'
import  Fog from '../assets/fog.png'
const TodaysWeather = () => {
    const navigate = useNavigate()
    const weather = useSelector((state) => state.city.weather);
    const city = useSelector((state) => state.city.city);


 
    if (!weather[0]?.day?.condition || weather.length === 0) {
        console.log()
        return (
            <div>
                <h2>Loading...</h2>
               
            </div>
        );
    }
    const navigate_to_next_page = () => {
        navigate('/TommorowsWeather') 
    }

    return (
        <div>
            <div>
                <div className='flex flex-row justify-center items-center'>
                    {weather[0]?.day.condition.text.toLowerCase().includes('mist') && <img src={mist} />}
                    {weather[0]?.day.condition.text.toLowerCase().includes('fog') && <img src={Fog} />}
                    {weather[0]?.day?.condition?.text.toLowerCase().includes('sun') && <img src={Sun} />}
                    {weather[0]?.day?.condition?.text.toLowerCase().includes('rain') && <img src={Rain} />}
                    {(weather[0]?.day?.condition?.text.toLowerCase().includes('cloudy') || weather[0]?.day.condition.text.toLowerCase().includes('overcast')) && <img src={Clouds} />}
                    {weather[0]?.day?.condition?.text.toLowerCase().includes('snow') && <img src={Snow} />}
                    <ArrowForwardIosIcon onClick={navigate_to_next_page} />
                </div>
            </div>
            <div className="flex justify-center">
                <div className='flex items-center'>
                    <h1 className="m-4 text-6xl">{city} today </h1>
                    <div>
                        <FontAwesomeIcon icon={faLocationArrow} size="3x" />
                    </div>
                </div>  
            </div>
            <div className='flex flex-row justify-center mb-12'>
                <span className=' text-4xl justify-center items-center '>{weather[0]?.day?.avgtemp_c} </span>
                <WiDegrees className='-m-4' size={'4em'} />
                <p className='mt-1 -ml-4 text-3xl'>C</p>
            </div>

            <Bottom uv={weather[0]?.day?.uv} wind={weather[0]?.day?.maxwind_kph} sunrise={weather[0]?.astro?.sunrise} sunset={weather[0]?.astro?.sunset} humidity={weather[0]?.day?.avghumidity}/>


        </div>
    );
};

export default TodaysWeather;

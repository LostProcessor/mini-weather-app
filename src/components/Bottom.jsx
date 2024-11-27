import React, { useState, useEffect, useRef } from 'react';

import * as  d3 from 'd3'
import DonutChart from './Donut.jsx'
const Bottom = ({ uv, wind, sunrise, sunset, humidity }) => {
    const [currentTime, setCurrentTime] = useState('');
    const[Sun, setSun] = useState({});
    const [Night, setNight] = useState({})

    function getDateTime() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hour = String(now.getHours()).padStart(2, '0');
        const minute = String(now.getMinutes()).padStart(2, '0');
        const second = String(now.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }
    function calculateDayAndNightTime(dayStart, dayEnd) {
        const toMinutes = (time) => {
            const [hourMinute, meridian] = time.split(" ");
            let [hours, minutes] = hourMinute.split(":").map(Number);
            if (meridian === "PM" && hours !== 12) hours += 12;
            if (meridian === "AM" && hours === 12) hours = 0;
            return hours * 60 + minutes;
        };

        const fullDayMinutes = 24 * 60;

        const dayStartMinutes = toMinutes(dayStart); // 6:38 AM
        const dayEndMinutes = toMinutes(dayEnd);     // 4:44 PM


        const daytimeDuration = dayEndMinutes - dayStartMinutes;


        const nighttimeDuration =
            dayStartMinutes + (fullDayMinutes - dayEndMinutes);

        setSun({ hours: Math.floor(daytimeDuration / 60), minutes: daytimeDuration % 60 })
        setNight({ hours: Math.floor(nighttimeDuration / 60), minutes: nighttimeDuration % 60 })
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(getDateTime());
        }, 1000);

        return () => clearInterval(intervalId); 
    }, []);
    useEffect(() => {
        calculateDayAndNightTime(sunrise, sunset);
    }, []);
    return (
        <>
            <div className='flex flex px-16 py-16 align-middle  bg-slate-100 items-center justify-center space-between rounded-md'>
                <div className='w-1/3'>
                    <div>Time: {currentTime}</div>
                </div>
               
                <div className='w-1/3'>
                    <p>UV: {uv}</p>
                </div>
                <div>
                    <p><span className='whitespace-nowrap'>
                        humidity:   {humidity} %
                    </span>
                      
                    </p>
                </div>
                <div className='w-1/3'>
                    <p> km/h wind: {wind}</p>
                </div>
            </div>
            <div className='flex flex-row w-full justify-center items-center'>
                <p className='mt-32'>night {Night.hours} : {Night.minutes} </p>
                {sunrise && sunset && <DonutChart sunrise={sunrise} sunset={sunset} />}
                <p className='-mt-32'> day {Sun.hours} :{Sun.minutes}  </p>
            
            </div>
        </>
    );
};

export default Bottom;

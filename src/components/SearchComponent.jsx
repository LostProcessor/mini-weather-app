import { useState, useRef,useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addCity } from '../redux/slices/citySlice.js'
import SearchIcon from '@mui/icons-material/Search';
import { useLocation } from 'react-router-dom'

function SearchComponent() {
    const citys = ['New York', 'Los Angeles', 'Chicago', 'Miami', 'Toronto', 'Vancouver', 'Mexico City', 'São Paulo', 'Rio de Janeiro', 'Buenos Aires', 'Lima', 'Bogotá', 'Santiago', 'London', 'Paris', 'Berlin', 'Rome', 'Madrid', 'Amsterdam', 'Vienna', 'Prague', 'Athens', 'Tokyo', 'Beijing', 'Shanghai', 'Seoul', 'Bangkok', 'Singapore', 'Mumbai', 'New Delhi', 'Dubai', 'Istanbul', 'Cairo', 'Cape Town', 'Nairobi', 'Lagos', 'Marrakech', 'Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Auckland', 'Wellington', 'Kyoto', 'Florence', 'Fez', 'Hong Kong', 'Zurich', 'San Francisco', 'Venice', 'Bali', 'Cancun']

    const [searchItem, setSearchItem] = useState('')
    const [filteredcitys, setFilteredcitys] = useState(citys)
    const [isWriting, setIsWriting] = useState(false)
    const typingTimeout = useRef(null) 
    const location =  useLocation()
    const dispatch = useDispatch()
    const [index,setIndex] = useState(0)
    const handleInputChange = (e) => {
        const searchTerm = e.target.value;
        setSearchItem(searchTerm);

   
        if (typingTimeout.current) {
            clearTimeout(typingTimeout.current);
        }

        setIsWriting(true);

        typingTimeout.current = setTimeout(() => {
            setIsWriting(false);
        }, 3000);

        const filteredItems = citys.filter((city) =>
            city.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredcitys(filteredItems);
    }

    const handleClick = () => {
        if (filteredcitys.length === 1) {
            dispatch(addCity(filteredcitys[0]))
            setSearchItem('')
        }
        else if (citys.includes(searchItem)) {
            dispatch(addCity(searchItem))
        }
    }
    useEffect(() => {
        console.log(location)
        if (location.pathname == '/today') {

            setIndex(0)

        }
        else if (location.pathname == '/TommorowsWeather') {
            setIndex(1)
        }
        else if (location.pathname == '/TwoDaysFromNow') {
            setIndex(2)
        }

    },[location])
    return (
        <>  
            <div className = 'flex flex-row justify-center items-center p-4 '>
                <div className='flex'>
                    <input
                        type="text"
                        value={searchItem}
                        onChange={handleInputChange}
                        placeholder='Search Location'
                        className='rounded-sm  bg-slate-100 '/>
                    <div>
                        <SearchIcon className=' bg-slate-100'onClick={handleClick} />
                    </div>
                </div>


            </div>
           
            {isWriting && (
                <div className='max-h-28 overflow-hidden'>
                    <ul>
                        {filteredcitys.map(city => (
                            <li onClick={() => {
                                setSearchItem(city)
                            }} key={city}>
                                {city}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <div className="flex justify-center items-center space-x-2 mt-4 mb-52">
                {index == 0 ? <div className="w-3 h-3 rounded-full transition-all duration-300 bg-black scale-125 "></div>
                    : <div className="w-3 h-3 bg-gray-300 rounded-full transition-all duration-300 "></div>}
                {index == 1 ? <div className="w-3 h-3 rounded-full transition-all duration-300 bg-black scale-125 "></div> :
                <div className="w-3 h-3 bg-gray-300 rounded-full transition-all duration-300 "></div>}
                {index == 2 ? <div className="w-3 h-3 rounded-full transition-all duration-300 bg-black scale-125 "></div> : 
                    <div className="w-3 h-3 bg-gray-300 rounded-full transition-all duration-300 "></div>}
            </div>
        </>
    )
}

export default SearchComponent;

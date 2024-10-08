import JewelsCard, {withPromotedLabel} from '../components/JewelsCard';
import {useEffect, useState} from 'react';
import Shimmer from './Shimmer';
import mockData from '../utils/mockData'
import { MENU_API } from '../utils/constants';
import { Link } from 'react-router-dom';
import useOnlineStatus from '../utils/useOnlineStatus';
import transition from '../transition';

const Body = () => {
const [listOfRestaurants, setListOfRestaurants] = useState([]);
const [filteredRes, setFilteredRes] = useState([]);
const [searchText, setSearchText] = useState([]);
const RestCardPromoted = withPromotedLabel(JewelsCard)

// whenever state variable update, react triggers a reconciliation cycle(re-renders the component)
useEffect(()=> {
    fetchData();
},[]);

const fetchData = async () =>{
    const data = await fetch(
        MENU_API
    );
    const json = await data.json();
    console.log(json , listOfRestaurants);
    setListOfRestaurants(json?.data?.success?.cards[1]?.gridWidget?.gridElements?.infoWithStyle?.restaurants)
    setFilteredRes(json?.data?.success?.cards[1]?.gridWidget?.gridElements?.infoWithStyle?.restaurants)
}

const onlineStatus = useOnlineStatus();
if (onlineStatus === false)
     return (<h1>Look's like you are offline! Please check your internet</h1>)

// conditional rendering
return listOfRestaurants.length === 0 ? (<Shimmer /> ):(
    <div className="body">
            <div className="px-24">
                
                <div className="search-bar">
                
                <input type="text" className='border border-solid border-black' value={searchText} onChange={(e)=>{
                    setSearchText(e.target.value)
                }} />
                <button className='px-4 py-2 bg-green-200 m-4 rounded-lg' onClick={()=>{
                    const filterRes = listOfRestaurants.filter((res)=>res.info.name.toLowerCase().includes(searchText.toLowerCase())//
                )
                    setFilteredRes(filterRes)
                    }}>Search</button>

                <button className="px-4 py-2 m-4 bg-orange-300 rounded-lg" onClick={()=>{
                const filteredItems = listOfRestaurants.filter((res)=> res.info.avgRating >= 4.2)
                setFilteredRes(filteredItems)
                }}>
                    Top Rated Restaurants
                </button>
                    
            </div>
            </div>
            
            <div className="flex flex-wrap">
            {filteredRes.map((restaurant) => (
               
                restaurant.info.promoted ? ( <Link to={'/restaurants/'+ restaurant.info.id } key={restaurant.info.id}><RestCardPromoted  resData={restaurant}/> </Link>):
            (<Link to={'/restaurants/'+ restaurant.info.id } key={restaurant.info.id}><JewelsCard key={restaurant.info.id} resData={restaurant}/></Link>)
        ))}
            </div>
        
            
    </div>
    );
};

export default Body
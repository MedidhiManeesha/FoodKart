import {useState, useEffect} from "react";
import Shimmer from './Shimmer';
import { useParams } from 'react-router-dom';
import { REST_ID } from "../utils/constants";
// import useRestMenu from '../utils/useRestMenu';
// useParams
const RestMenu = () =>{
    const [ resInfo, setResInfo] = useState(null);
    const {resId} = useParams();
// const params = useParams();
// console.log(params) -->resId:70500

    useEffect(()=>{
        fetchMenu();
    },[]);

    const fetchMenu = async ()=>{
        const data = await fetch(REST_ID + resId);
        const json = await data.json();
        console.log(json);
        setResInfo(json.data);
        
    }
    // Checking if resInfo is defined before destructuring
    if (resInfo === null) return <Shimmer/>

    // conditional destructuring
    // Check that the nested object exists before destructuring
    const info = resInfo?.cards[2]?.card?.card?.info;
    const {name,cuisines,costForTwoMessages} = info || {};
    const {itemCards}= resInfo?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card || [];
    
    console.log(itemCards);


    return (
        <div className="menu">
            <h1 className="font-bold text-2xl">{name}</h1>
            <h3>{cuisines.join(", ")} - {costForTwoMessages}</h3>
            <ul>
            
            {Array.isArray(itemCards) && itemCards.length > 0 ? (
                    itemCards.map((item, index) => {
                        // Log each item to verify the structure
                        console.log(`Item ${index}:`, item);

                        // Ensure that item.card.info exists
                        return item?.card?.info ? (
                            <li key={item.card.info.id}>
                                {item.card.info.name} - {"Rs."} {item.card.info.defaultPrice / 100 || item.card.info.price / 100}
                            </li>
                        ) : (
                            <li key={index}>No valid item data available</li>
                        );
                    })
                ) : (
                    <li>No items available</li>
                )}
            </ul>
            {/* <ul>
                {itemCards.map((item) => <li key={item.card.info.id}>{item.card.info.name} - {"Rs."} {item.card.info.defaultPrice/100 || item.card.info.price/100}</li> )}
                
            </ul>  */}
        </div>
    )
}

export default RestMenu;
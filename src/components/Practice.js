// Body component

import React, {useState, useEffect} from "react";
import Header from "./Header";
import DummyCard from "./DummyCard";

const Practice = () =>{
    const [listOfRes, setListOfRes] = useState([])
    const [searchTxt, setSearchTxt] = useState([])
    
    useEffect(()=>{
        fetchData()
    },[])
    const fetchData = async () =>{
        const data = await fetch('https://corsproxy.io/?https://www.swiggy.com/mapi/homepage/getCards?lat=17.2754162&lng=78.3752973')
        const json = await data.json()
        console.log(json)
        setListOfRes(json?.data?.cards[1]?.gridElements?.infoWithStyle?.restaurants)
    }


    return(
        <div>
            <Header />
            <div className="filter">
                <div className="filter-btn">
                    <button onClick={()=>{
                        const filteredRes = listOfRes.filter((res)=>res.info.avgRating >=4.3)
                        setListOfRes(filteredRes)}}>Top rated res</button>
                </div>
                <div className="btn-search">
                    <input type="text" value={searchTxt} onChange={(e)=>{setSearchTxt(e.target.value)}}/>
                    <button onClick={()=>{
                        const filteredList = listOfRes.filter((res)=>res.info.name.includes(searchTxt))
                        setListOfRes(filteredList)}}>Search</button>
                </div>
            </div>
            <div className="jewel-container">
            {
                listOfRes.map((restaurant)=>(
                    <DummyCard key={restaurant.info.id} resData={restaurant}/>
                ))
            }
            </div>
        </div>
    )
}

export default Practice
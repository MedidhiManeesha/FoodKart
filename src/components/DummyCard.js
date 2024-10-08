import React, {useState, useEffect} from "react";
import CDN_URL from "../utils/constants";



const DummyCard = (props) =>{
    const {resData} = props
    const {name, cloudinaryImageId, cuisines, avgRating, costForTwo } = resData.info
    return(
        <div className="jewel-card">
            <img src={CDN_URL+cloudinaryImageId} className="gold-card" alt="res" />
            <h2>{name}</h2>
            <h3>{cuisines.join(', ')}</h3>
            <h3>{avgRating}</h3>
            <h3>{costForTwo}</h3>
        </div>
    )
}

export default DummyCard
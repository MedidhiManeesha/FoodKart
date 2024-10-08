import React from 'react'

const Shimmer = () => {
    let shimmerItems = [];
    for(let i =0 ; i< 15; i++){
        shimmerItems.push(<div key={i} className='shimmer-card'></div>)
    }
    return (
    <div className="shimmer-container">{shimmerItems}</div>
    )
}

export default Shimmer;

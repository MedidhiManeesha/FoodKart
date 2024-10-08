import {CDN_URL} from '../../src/utils/constants'

const JewelsCard = (props) =>{
    const {resData} = props;
    const {name, cloudinaryImageId, cuisines, avgRating, costForTwo} = resData?.info;
    return (
        <div className="w-[250px] m-2 p-4 shadow-lg rounded-lg bg-gray-100 hover:bg-gray-200" >
            <img className="rounded-lg"
            src={CDN_URL+cloudinaryImageId}
            alt="bangle" />
                <h3 className='font-bold py-4 text-xl'>{name}</h3>
                <h4>{cuisines.join(", ")}</h4>
                <h4>{avgRating}</h4>
                <h4>{costForTwo}</h4>
        </div>
    );
};

// Higher order Component
export const withPromotedLabel = (JewelsCard) =>{
    return (props)=>{
        return(
            <div>
                <label className='absolute bg-black text-white m-2 p-2 rounded-lg'>Promoted</label>
                <JewelsCard {...props}/>
            </div>
        )
    }
}
// input is RestCard, output is RestCardPromoted
export default JewelsCard;
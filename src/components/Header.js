import React from 'react';
import ReactDOM from 'react-dom/client';
import {useState} from 'react';
import logo from '../../img/logo.png';
import {Link} from 'react-router-dom';
import useOnlineStatus from '../utils/useOnlineStatus';
const Header = () =>{
    
    const [loginBtn, setLoginBtn] = useState("Login")
    const onlineStatus = useOnlineStatus()
    return(
        <div className="flex justify-between shadow-lg bg-pink-900"> 
            <div className="logo-container p-3 self-center">
                <img 
                className="logo" src={logo}
                />
            </div>             
            <div className="nav-items">
                <ul className='flex p-3 m-3'>
                    <li className='px-3'>Online Status: {onlineStatus ? "Yes" : "No"}</li>
                    <li className='px-3'>
                        <Link to='/'>
                            Home
                        </Link>
                    </li>
                    <li className='px-3'>
                        <Link to='/about'>
                            About
                        </Link>
                    </li>
                    <li className='px-3'>
                        <Link to='/contact'>
                            Contact
                        </Link>
                    </li>
                    <li className='px-3'>
                        <Link to='/grocery'>
                            Grocery
                        </Link>
                    </li>
                    <button className='login' onClick={()=>{loginBtn === "Login" ? setLoginBtn("Logout"): setLoginBtn("Login")}}>{loginBtn}</button>
                </ul>
            </div> 
        </div> 
        
    );
};

export default Header
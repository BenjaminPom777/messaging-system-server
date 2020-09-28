import React from 'react';
import {useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import {userLogout} from './../../redux/actions/userActions';


export default function Nav() {

    const navStyle = {
        color: 'white'
    }

    const dispatch = useDispatch();    
    const logout =()=>{
        dispatch(userLogout())
    } 
    
    return (
        <nav>
                      
            <Link style={navStyle} to="/user">
                <h3>Profile</h3>
            </Link>
            <ul className="nav-links">
                <Link style={navStyle} to='/compose'>
                    <li>Compose </li>
                </Link>
                <Link style={navStyle} to='/manage'>
                    <li>Manage </li>
                </Link>  
                <a style={navStyle} href="/">
                <div onClick={logout}>logout</div>                    
                </a>          
                
            </ul>
        </nav>
    )
}

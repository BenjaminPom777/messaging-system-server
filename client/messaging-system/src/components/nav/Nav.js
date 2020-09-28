import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import {userLogout} from './../../redux/actions/userActions';


export default function Nav(props) {

    const {user} = useSelector(state => state);
    const {email} = user;

    const navStyle = {
        color: 'white'
    }

    const dispatch = useDispatch();    
    const logout =()=>{
        dispatch(userLogout())
    } 
    
    return (
        <nav>
                      
            <Link style={navStyle} to="/">
                <h3>{email}</h3>
            </Link>
            <ul className="nav-links">
                <Link style={navStyle} to='/compose'>
                    <li>Compose Email</li>
                </Link>
                <Link style={navStyle} to='/manage'>
                    <li>Manage Emails</li>
                </Link>  
                <li style={navStyle}>
                <div onClick={logout}>logout</div>                    
                </li>          
                
            </ul>
        </nav>
    )
}

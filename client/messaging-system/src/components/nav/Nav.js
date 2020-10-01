import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { userLogout, getUserInfo } from './../../redux/actions/userActions';



export default function Nav() {

    const { user } = useSelector(state => state)

    useEffect(() => {
        dispatch(getUserInfo(user.userId))
    }, [])

    const navStyle = {
        color: 'white'
    }

    const dispatch = useDispatch();
    const logout = () => {
        dispatch(userLogout())
    }

    return (
        <nav>
            <ul className="nav-links">
                {!user.isLogedIn && <Link style={navStyle} to="/login">
                    <h3>Login</h3>
                </Link>}
                {!user.isLogedIn && <Link style={navStyle} to="/register">
                    <h3>Register</h3>
                </Link>}
                {user.isLogedIn && <Link style={navStyle} to="/user">
                    <h3>Profile</h3>
                </Link>}
                {user.isLogedIn && <Link style={navStyle} to='/compose'>
                    <li>Compose </li>
                </Link>}
                {user.isLogedIn && <Link style={navStyle} to='/manage'>
                    <li>Manage </li>
                </Link>}
                {user.isLogedIn && <a style={navStyle} href="/">
                    <div onClick={logout}>logout</div>
                </a>}

            </ul>
        </nav>
    )
}

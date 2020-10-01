import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { userLogout, getUserInfo } from './../../redux/actions/userActions';



export default function Nav() {

    const { user } = useSelector(state => state)

    useEffect(() => {
        dispatch(getUserInfo(user.userId))
    }, [])    

    const dispatch = useDispatch();

    const logout = () => {
        dispatch(userLogout())
    }

    const toggleNav = () => {
        dispatch({
            type:'TOGGLE_NAVS'
        })
    }

    useEffect(() => {
        const navToggler = document.querySelector('.nav-toggler');
        const navMenu = document.querySelector('.site-navbar ul');
        const navLinks = document.querySelectorAll('.site-navbar a');
        // load all event listners
        allEventListners();

        function allEventListners() {
            navToggler.addEventListener('click', togglerClick);
            navLinks.forEach(elem => elem.addEventListener('click', navLinkClick));
        }


        function togglerClick() {
            navToggler.classList.toggle('toggler-open');
            navMenu.classList.toggle('open');
        }

        function navLinkClick() {
            if (navMenu.classList.contains('open')) {
                navToggler.click();
            }
        }
    }, [])

    const linkStyle={
        textDecoration:'none',
    }

    const linkHidenStyle={
        textDecoration:'none',
        display:'none'
    }

    return (
        <header className="header-area">
            <div className="navbar-area">
                <div className="container">
                    <nav className="site-navbar">
                        <Link style={linkStyle}  to="/">
                        {user.isLogedIn?<p  className="site-logo">Profile</p>:<p  className="site-logo">Welcome</p>}
                        </Link>
                        <ul>
                            <Link style={!user.isLogedIn?linkStyle:linkHidenStyle} to="/login">
                            <li>login</li>
                            </Link>
                            <Link style={!user.isLogedIn?linkStyle:linkHidenStyle}  to="/register">
                            <li>register</li>
                            </Link>

                            <Link style={user.isLogedIn?linkStyle:linkHidenStyle}  to="/compose">
                            <li>compose</li>
                            </Link>
                            <Link style={user.isLogedIn?linkStyle:linkHidenStyle}  to="/manage">
                            <li>manage</li>
                            </Link>                                                     
                            <Link to="#" style={user.isLogedIn?linkStyle:linkHidenStyle} onClick={logout}>
                            <li>Logout</li>
                            </Link>
                        </ul>                    
                        <button onClick={toggleNav} className="nav-toggler">
                            <span></span>
                        </button>
                    </nav>
                </div>
            </div>
        </header>



    )
}

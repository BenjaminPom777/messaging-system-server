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

        // functions of all event listners
        function allEventListners() {
            // toggler icon click event
            navToggler.addEventListener('click', togglerClick);
            // nav links click event
            navLinks.forEach(elem => elem.addEventListener('click', navLinkClick));
        }

        // togglerClick function
        function togglerClick() {
            navToggler.classList.toggle('toggler-open');
            navMenu.classList.toggle('open');
        }

        // navLinkClick function
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
            {/* <!-- site-navbar start --> */}
            <div className="navbar-area">
                <div className="container">
                    <nav className="site-navbar">
                        {/* <!-- site logo --> */}
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
                            {/* <Link style={user.isLogedIn?linkStyle:linkHidenStyle}  to="/">
                            <li>Profile</li>
                            </Link> */}
                            <Link style={user.isLogedIn?linkStyle:linkHidenStyle} onClick={logout}>
                            <li>Logout</li>
                            </Link>
                        </ul>

                        {/* <!-- nav-toggler for mobile version only --> */}
                        <button onClick={toggleNav} className="nav-toggler">
                            <span></span>
                        </button>
                    </nav>
                </div>
            </div>
            {/* <!-- navbar-area end --> */}

            {/* <div class="intro-area">
          <div class="container">
            <h2>Responsive Navbar with pure JavaScript</h2>
            <p>Please resize your browser and see the result</p>
          </div>
        </div> */}

            {/* <nav>
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
</nav> */}
        </header>



    )
}

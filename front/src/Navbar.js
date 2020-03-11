import React from 'react';
import { NavLink } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
    return(
        <div class='navbar-container'>
            <div>
                <NavLink exact to='/' activeClassName='logo'>
                    <img src="https://i.imgur.com/j8aPf6r.png" alt="Volkswagen Digital Solutions" class="VWDS-logo"/>
                </NavLink>
            </div>
            <div className="navbar">
                <NavLink exact to='/trip/start'activeClassName="active"><p class="navbarlink">Start</p></NavLink>
                <NavLink exact to='/trip/end'activeClassName="active"><p class="navbarlink">End</p></NavLink>
                <NavLink exact to='/trip'activeClassName="active"><p class="navbarlink2">Trips Log</p></NavLink>
            </div>
        </div>
    )
}

export default Navbar;
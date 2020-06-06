import React, { useContext } from 'react';

import { AuthContext } from '../Context/auth-context';

import Aux from '../../hoc/Auxillary';

import './NavLink.css';

const NavLink = props => {
    const auth = useContext(AuthContext);
    return (
        <Aux>
            <ul className="main-nav js--main-nav">
                <li><a href="#features">Food delivery</a></li>
                <li><a href="#menu">Menu</a></li>
                <li><a href="#contact">Contact</a></li>
                {auth.isLoggedIn && (
                    <li><a onClick={props.white}>Light Logo</a></li>
                )}
                {auth.isLoggedIn && (
                    <li><a onClick={props.black}>Dark Logo</a></li>
                )}
                {auth.isLoggedIn && (
                    <li><a onClick={auth.logout}>Log out</a></li>
                )}
            </ul>
            <a className="mobile-nav-icon js--nav-icon"><i className="ion-navicon-round"></i></a>
        </Aux>
        
    );
}

export default NavLink;
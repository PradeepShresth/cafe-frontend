import React, { useState, useContext, useEffect } from 'react';

import axios from 'axios';

import Aux from '../../hoc/Auxillary';
import Modal from '../../UIElements/Modal/Modal';

import { AuthContext } from '../Context/auth-context'

import UpdateWhiteLogo from './UpdateWhiteLogo';
import UpdateBlackLogo from './UpdateBlackLogo';
import NavLink from './NavLink';

import './MainNavigation.css';

const MainNavigation = props => {
    const auth = useContext(AuthContext);
    const [whiteLogo, setWhiteLogo]= useState();
    const [blackLogo, setBlackLogo]= useState();
    const [whiteLogoUpdating, setWhiteLogoUpdating]= useState(false);
    const [blackLogoUpdating, setBlackLogoUpdating]= useState(false);

    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND_URL + '/blackLogo')
            .then(response => {
                const blackLogo = response.data.logo.image;
                setBlackLogo(blackLogo);
            })
            .catch(error => {
                console.log(error);
            });
        axios.get(process.env.REACT_APP_BACKEND_URL + '/whiteLogo')
            .then(response => {
                const whiteLogo = response.data.logo.image;
                setWhiteLogo(whiteLogo);
            })
            .catch(error => {
                console.log(error);
            });
    }, [whiteLogo, blackLogo])

///-------------- WHITE LOGO HANDLERS ----------////

    const onUpdatewhiteLogoHandler = newLogo => {
        setWhiteLogo(newLogo);
    }

    const whiteLogoUpdatingHandler = () => {
        setWhiteLogoUpdating(true);
    }

    const whiteLogoUpdateCancelHandler = () => {
        setWhiteLogoUpdating(false);
    }

///-------------- BLACK LOGO HANDLERS ----------////

    const onUpdateBlackLogoHandler = newLogo => {
        setBlackLogo(newLogo);
    }

    const blackLogoUpdatingHandler = () => {
        setBlackLogoUpdating(true);
    }

    const blackLogoUpdateCancelHandler = () => {
        setBlackLogoUpdating(false);
    }

    return (
        <Aux>
            <Modal show={blackLogoUpdating} modalClosed={blackLogoUpdateCancelHandler}>
                <UpdateBlackLogo
                    cancel={blackLogoUpdateCancelHandler}
                    onUpdateLogo={onUpdateBlackLogoHandler}
                />
            </Modal>
            <Modal show={whiteLogoUpdating} modalClosed={whiteLogoUpdateCancelHandler}>
                <UpdateWhiteLogo
                    cancel={whiteLogoUpdateCancelHandler}
                    onUpdateLogo={onUpdatewhiteLogoHandler}
                />
            </Modal>
            <header style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${process.env.REACT_APP_ASSET_URL}/${props.banner })`,
            }}>
                <nav>
                    <div className="row">
                        <img src={`${process.env.REACT_APP_ASSET_URL}/${whiteLogo}`} alt="logo" class="logo" />
                        <img src={`${process.env.REACT_APP_ASSET_URL}/${blackLogo}`} alt="logo" className="logo-black" />
                        <NavLink 
                            white={whiteLogoUpdatingHandler}
                            black={blackLogoUpdatingHandler}
                        />
                    </div>
                </nav>
                <div className="hero-text-box">
                    <h1>Goodbye junk food.<br /> Hello super healthy meals</h1>
                    <a className="btn btn-full js--scroll-to-menu" >Menu</a>
                    <a className="btn btn-ghost js--scroll-to-start">Show me more</a>
                    {auth.isLoggedIn &&
                        <a className="btn btn-edit-banner" onClick={props.added}>Edit Banner</a>
                    }
                </div>
            </header>
        </Aux>
    )
}

export default MainNavigation;
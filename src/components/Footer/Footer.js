import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import Aux from '../../hoc/Auxillary';
import Modal from '../../UIElements/Modal/Modal';

import { AuthContext } from '../Context/auth-context';

import UpdateFooter from './UpdateFooter';

import './Footer.css';

const Footer = props => {
    const auth = useContext(AuthContext);
    const [footerUpdating, setFooterUpdating] = useState(false);
    const [footer, setFooter] = useState({});

    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND_URL + '/footer')
            .then(response => {
                const footer = response.data.footer;
                setFooter(footer);
            })
            .catch(error => {
                console.log(error);
            });
    }, [])

    const updatingFooterHandler = () => {
        setFooterUpdating(true);
    }
    const cancelUpdatingFooterHandler = () => {
        setFooterUpdating(false);
    }

   const onUpdateFooter = newFooter => {
        setFooter(newFooter);
    }

    return(
        <Aux>
            <Modal show={footerUpdating} modalClosed={cancelUpdatingFooterHandler}>
                <UpdateFooter cancel={cancelUpdatingFooterHandler} footer={footer} onUpdateFooter={onUpdateFooter} />
            </Modal>

            <footer id="contact">
                {auth.isLoggedIn &&
                    <div className="row" style={{ marginBottom: '20px' }}>
                        <a className="btn btn-review-image" onClick={updatingFooterHandler}>Edit Footer</a>
                    </div>
                }
                <div className="row">
                    <div className="col span-1-of-3 about-footer">
                        <h3>About</h3>
                        <p>{footer.about}</p>
                    </div>
                    <div className="col span-1-of-3">
                        <h3>Contact</h3>
                        <p>{footer.address}</p>
                        <p className="info">{footer.phone}</p>
                        <p className="info">{footer.email}</p>
                    </div>
                    <div className="col span-1-of-3">
                        <h3>Follow Us</h3>
                        <ul className="social-links">
                            <li><a href={footer.facebook}><i className="ion-social-facebook"></i></a></li>
                            <li><a href={footer.twitter}><i className="ion-social-twitter"></i></a></li>
                            <li><a href={footer.instagram}><i className="ion-social-instagram"></i></a></li>
                        </ul>
                    </div>
                </div>
            </footer>
        </Aux>
    )
}

export default Footer;
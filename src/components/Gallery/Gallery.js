import React, { useContext } from 'react';

import {AuthContext} from '../Context/auth-context';

import Aux from '../../hoc/Auxillary';

import './Gallery.css';

const Gallery = props => {
    const auth = useContext(AuthContext);
    return (
        <section className="section-meals">
            <ul className="meals-showcase clearfix">
                {props.galleries.map(gallery => {
                    return (
                        <Aux key={gallery.id}>
                            { auth.isLoggedIn === true ? (
                                <li onClick={() => props.gallerySelectedHandler(gallery.id)}>
                                    <figure className="meal-photo">
                                        <img src={`${process.env.REACT_APP_ASSET_URL}/${gallery.image}`} alt="" />
                                    </figure>
                                </li>
                            ) : (
                                <li>
                                    <figure className="meal-photo">
                                        <img src={`${process.env.REACT_APP_ASSET_URL}/${gallery.image}`} alt="" />
                                    </figure>
                                </li>
                            )}
                        </Aux>
                    )
                })}
                
            </ul>
        </section>
    );
};

export default Gallery;
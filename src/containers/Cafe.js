import React, { Component } from 'react';

import axios from 'axios';

import Modal from '../UIElements/Modal/Modal';
import Aux from '../hoc/Auxillary';

import MainNavigation from '../components/Navigation/MainNavigation';
import NewBanner from '../components/Navigation/NewBanner';
import Features from '../components/Features/Features';
import Gallery from '../components/Gallery/Gallery';
import UpdateGallery from '../components/Gallery/UpdateGallery';
import Menu from '../components/Menu/Menu';
import Reviews from '../components/Reviews/Reviews';
import Map from '../components/Map/Map';
import Footer from '../components/Footer/Footer';

import './queries.css';

class Cafe extends Component {
    state = {
        banner: '',
        banner_adding: false,
        gallery: [],
        gallery_adding: false,
        galleryId: {},
    }

    componentDidMount () {
        axios.get('http://localhost:8080/api/banner')
            .then(response => {
                const banner  = response.data.banner.image;
                this.setState({banner: banner});
            })
            .catch(error => {
                console.log(error);
            });

        axios.get('http://localhost:8080/api/gallery')
            .then(response => {
                const gallery  = response.data.galleries;
                this.setState({gallery: gallery});
            })
            .catch(error => {
                console.log(error);
            });
    }

// ------BANNER------------------//
    addNewBannerHandler = newBanner => {
        this.setState(state => {
            state.banner = newBanner;
            const banner=state.banner;
            return {
                banner
            };
        });
    };

    bannerAddingHandler = () => {
        this.setState({banner_adding: true})
    }

    bannerCancelHandler = () => {
        this.setState({banner_adding: false})
    }

// ------GALLERY------------------//
    
    addNewGalleryHandler = newGallery => {
        this.setState(state => {
            state.gallery = newGallery;
            const gallery = state.gallery;
            return {
                gallery
            };
        });
    };

    galleryAddingHandler = gId => {
        this.setState(state => {
            state.galleryId = gId;
            const galleryId = state.galleryId;
            return {
                galleryId
            };
        });
        this.setState({gallery_adding: true});
        console.log(this.state.galleryId);
    };

    galleryCancelHandler = () => {
        this.setState({gallery_adding: false})
    }


    render () {
        return (
            <Aux>
                <Modal show={this.state.banner_adding} modalClosed={this.bannerCancelHandler}>
                    <NewBanner cancel={this.bannerCancelHandler} onAddBanner={this.addNewBannerHandler} />
                </Modal>
                <Modal show={this.state.gallery_adding} modalClosed={this.galleryCancelHandler}>
                    <UpdateGallery cancel={this.galleryCancelHandler} onAddGallery={this.addNewGalleryHandler} gid={this.state.galleryId} />
                </Modal>

                
                <MainNavigation added={this.bannerAddingHandler} banner={this.state.banner} />
                <Features />
                <Gallery gallerySelectedHandler={this.galleryAddingHandler} galleries={this.state.gallery} />
                <Menu />
                <Reviews />
                <Map />
                <Footer />
            </Aux>
        );
    }
};

export default Cafe;
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { AuthContext } from '../Context/auth-context';

import Aux from '../../hoc/Auxillary';
import Modal from '../../UIElements/Modal/Modal';

import UpdateReviewImage from './UpdateReviewImage';
import UpdateReview from './UpdateReview';

import './Reviews.css';

const Reviews = props => {
    const auth = useContext(AuthContext);
    const [reviewImage, setReviewImage] = useState('');
    const [reviewImage_updating, setReviewImage_updating] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [review_updating, setReview_updating] = useState(false);
    const [current_review, setCurrent_review] = useState({});
    
    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND_URL + '/review/image')
            .then(response => {
                const reviewImage  = response.data.reviewImage.image;
                setReviewImage(reviewImage);
            })
            .catch(error => {
                console.log(error);
            });
        
        axios.get(process.env.REACT_APP_BACKEND_URL + '/review/')
            .then(response => {
                const reviews = response.data.reviews;
                setReviews(reviews);
            })
            .catch(error => {
                console.log(error);
            });
    }, [
    ])

    const reviewImageUpdatingHandler = () => {
        setReviewImage_updating(true);
    }

    const reviewImageCancelHandler = () => {
        setReviewImage_updating(false);
    }

    const onUpdateReviewImageHandler = newReviewImage => {
        setReviewImage(newReviewImage);
    };

    const updateReviewHandler = c_review => {
        setCurrent_review(c_review);
        setReview_updating(true);
    }

    const reviewCancelHandler = () => {
        setReview_updating(false);
    }

    const onUpdateReviewHandler = newReview => {
        setReviews(newReview);
    };


    return (
        <Aux>
            <Modal show={reviewImage_updating} modalClosed={reviewImageCancelHandler}>
                <UpdateReviewImage cancel={reviewImageCancelHandler} onUpdateReviewImage={onUpdateReviewImageHandler} />
            </Modal>
            <Modal show={review_updating} modalClosed={reviewCancelHandler}>
                <UpdateReview 
                    cancel={reviewCancelHandler} 
                    onUpdateReview={onUpdateReviewHandler} 
                    review={current_review} 
                />
            </Modal>

            <section 
                className="section-testimonials"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${process.env.REACT_APP_ASSET_URL}/${reviewImage })`,
            }}>
                <div className="row">
                    <h2>Our customers can't live without us</h2>
                    {auth.isLoggedIn && 
                        <a className="btn btn-review-image" onClick={reviewImageUpdatingHandler}>Edit Image</a>
                    }
                </div>
                <div className="row">
                    {reviews.map(review => {
                        return (
                            <div key={review._id} className="col span-1-of-3">
                                <blockquote>
                                    {review.comment}
                                    <cite>
                                        <img src={`${process.env.REACT_APP_ASSET_URL}/${review.image}`} alt="" />{review.name}
                                        {auth.isLoggedIn && 
                                            <a className="btn btn-review-image" onClick={() => updateReviewHandler(review)}>Edit Review</a>
                                        }
                                        </cite>
                                </blockquote>
                            </div>
                        );
                    })}
                    
                </div>
            </section>
        </Aux>
    );
};

export default Reviews;
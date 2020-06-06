import React, { useState, useContext } from 'react';

import { AuthContext } from '../Context/auth-context';

import axios from 'axios';

const UpdateReview = props => {
    const auth = useContext(AuthContext);
    const [name, setName] = useState('');
    const [imageFile, setImageFile] = useState('');
    const [comment, setComment] = useState('');

    const ReviewSubmitHandler = async event => {
        event.preventDefault();
        const data = new FormData();
        data.append("rid", props.review._id);
        data.append("name", name);
        data.append("image", imageFile);
        data.append("comment", comment);
        try {
            const response = await axios.patch(process.env.REACT_APP_BACKEND_URL + "/review/", data, {
                headers: {
                  'Authorization': 'Bearer ' + auth.token
                }
            })
            props.onUpdateReview(response.data.reviews);
        } catch (err) {
            console.log(err);
        }
    };

    const nameHandler = event => {
      setName(event.target.value);
    };

    const imageHandler = event => {
      setImageFile(event.target.files[0]);
    };

    const commentHandler = event => {
      setComment(event.target.value);
    };
    
    return (
        <React.Fragment>
            <form className="form-control" onSubmit={ReviewSubmitHandler}>
                <input type="text" onChange={nameHandler} defaultValue={props.review.name} required />
                <input type="file" onChange={imageHandler} />
                <textarea onChange={commentHandler} defaultValue={props.review.comment} required></textarea>
                <button className="add-btn" type="submit" onClick={props.cancel}>UPDATE REVIEW</button>
                <a className="cancel-btn" onClick={props.cancel}>CANCEL</a>
            </form>
        </React.Fragment>
    );
}

export default UpdateReview;
import React, { useState, useContext } from 'react';

import { AuthContext } from '../Context/auth-context';

import axios from 'axios';

const UpdateReviewImage = props => {
    const auth = useContext(AuthContext);
    const [imageFile, setImageFile] = useState('');

    const ReviewImageSubmitHandler = async event => {
        event.preventDefault();
        const data = new FormData();
        data.append("image", imageFile);
        try {
            const response = await axios.patch(process.env.REACT_APP_BACKEND_URL + "/review/image", data, {
                headers: {
                  'Authorization': 'Bearer ' + auth.token
                }
            })
            props.onUpdateReviewImage(response.data.reviewImage.image);
        } catch (err) {
            console.log(err);
        }
    };

    const imageHandler = event => {
      setImageFile(event.target.files[0]);
    };
    
    return (
        <React.Fragment>
            <form className="form-control" onSubmit={ReviewImageSubmitHandler}>
                <input type="file" onChange={imageHandler} />
                <button className="add-btn" type="submit" onClick={props.cancel}>UPDATE IMAGE</button>
                <a className="cancel-btn" onClick={props.cancel}>CANCEL</a>
            </form>
        </React.Fragment>
    );
}

export default UpdateReviewImage;
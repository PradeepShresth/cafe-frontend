import React, { useState, useContext } from 'react';

import { AuthContext } from '../Context/auth-context';

import axios from 'axios';

const UpdateGallery = props => {
    const auth = useContext(AuthContext);
    const [imageFile, setImageFile] = useState('');

    const GallerySubmitHandler = async event => {
        event.preventDefault();
        const data = new FormData();
        data.append("gid", props.gid)
        data.append("image", imageFile);
        try {
            const response = await axios.patch(process.env.REACT_APP_BACKEND_URL + '/gallery/', data, {
                headers: {
                  'Authorization': 'Bearer ' + auth.token
                }
            });
            setImageFile('');
            props.onAddGallery(response.data.galleries);
        } catch (err) {
            console.log(err);
        }
    };

    const imageHandler = event => {
      setImageFile(event.target.files[0]);
    };
    
    return (
        <React.Fragment>
            <form className="form-control" onSubmit={GallerySubmitHandler}>
                <input type="file" onChange={imageHandler} />
                <button className="add-btn" type="submit" onClick={props.cancel}>Update Gallery</button>
                <a className="cancel-btn" onClick={props.cancel}>CANCEL</a>
            </form>
        </React.Fragment>
    );
}

export default UpdateGallery;
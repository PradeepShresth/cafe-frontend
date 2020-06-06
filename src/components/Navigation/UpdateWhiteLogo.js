import React, { useState, useContext } from 'react';

import { AuthContext } from '../Context/auth-context';

import axios from 'axios';

const UpdateWhiteLogo = props => {
    const auth = useContext(AuthContext);
    const [imageFile, setImageFile] = useState('');

    const WLogoSubmitHandler = async event => {
        event.preventDefault();
        const data = new FormData();
        data.append("image", imageFile);
        try {
            const response = await axios.patch(process.env.REACT_APP_BACKEND_URL + "/whiteLogo", data, {
                headers: {
                  'Authorization': 'Bearer ' + auth.token
                }
            })
            props.onUpdateLogo(response.data.logo.image);
        } catch (err) {
            console.log(err);
        }
    };

    const imageHandler = event => {
      setImageFile(event.target.files[0]);
    };
    
    return (
        <React.Fragment>
            <form className="form-control" onSubmit={WLogoSubmitHandler}>
                <input type="file" onChange={imageHandler} required />
                <button className="add-btn" type="submit" onClick={props.cancel}>UPDATE LOGO</button>
                <a className="cancel-btn" onClick={props.cancel}>CANCEL</a>
            </form>
        </React.Fragment>
    );
}

export default UpdateWhiteLogo;
import React, { useState, useContext } from 'react';

import { AuthContext } from '../Context/auth-context';

import axios from 'axios';

const UpdateFooter = props => {
    const auth = useContext(AuthContext);
    const [about, setAbout] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [facebook, setFacebook] = useState('');
    const [twitter, setTwitter] = useState('');
    const [instagram, setInstagram] = useState('');

    const FooterSubmitHandler = async event => {
        event.preventDefault();
        const data = {
            about: about,
            address: address,
            phone: phone,
            email: email,
            facebook: facebook,
            twitter: twitter,
            instagram: instagram
        }
        try {
            const response = await axios.patch(process.env.REACT_APP_BACKEND_URL + "/footer/", data, {
              headers: {
                'Authorization': 'Bearer ' + auth.token
              }
          })
            props.onUpdateFooter(response.data.footer);
        } catch (err) {
            console.log(err);
        }
    };

    const aboutHandler = event => {
      setAbout(event.target.value);
    };

    const addressHandler = event => {
      setAddress(event.target.value);
    };

    const phoneHandler = event => {
      setPhone(event.target.value);
    };

    const emailHandler = event => {
      setEmail(event.target.value);
    };

    const facebookHandler = event => {
      setFacebook(event.target.value);
    };

    const twitterHandler = event => {
      setTwitter(event.target.value);
    };

    const instagramHandler = event => {
      setInstagram(event.target.value);
    };
    
    return (
        <React.Fragment>
            <form className="form-control" onSubmit={FooterSubmitHandler}>
                <textarea onChange={aboutHandler} placeholder="About" defaultValue={props.footer.about} ></textarea>
                <input type="text" onChange={addressHandler} placeholder="Address" defaultValue={props.footer.address} />
                <input type="text" onChange={phoneHandler} placeholder="Phone" defaultValue={props.footer.phone} />
                <input type="text" onChange={emailHandler} placeholder="Email" defaultValue={props.footer.email} />
                <input type="text" onChange={facebookHandler} placeholder="Facebook" defaultValue={props.footer.facebook} />
                <input type="text" onChange={twitterHandler} placeholder="Twitter" defaultValue={props.footer.twitter} />
                <input type="text" onChange={instagramHandler} placeholder="Instagram" defaultValue={props.footer.instagram} />
                <button className="add-btn" type="submit" onClick={props.cancel}>UPDATE REVIEW</button>
                <a className="cancel-btn" onClick={props.cancel}>CANCEL</a>
            </form>
        </React.Fragment>
    );
}

export default UpdateFooter;
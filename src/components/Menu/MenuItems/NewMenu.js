import React, { useState, useContext } from 'react';

import { AuthContext } from '../../Context/auth-context';

import axios from 'axios';

const NewMenu = props => {
    const auth = useContext(AuthContext);
    const [imageFile, setImageFile] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const NewMenuSubmitHandler = async event => {
        event.preventDefault();
        const data = new FormData();
        data.append("name", name)
        data.append("image", imageFile);
        data.append("type", props.currentValue);
        data.append("description", description)
        data.append("price", price)
        try {
            const response = await axios.post(process.env.REACT_APP_BACKEND_URL + '/menu/', data, {
              headers: {
                'Authorization': 'Bearer ' + auth.token
              }
          });
            setName('');
            setDescription('');
            setPrice('');
            props.onAddMenu(response.data.menu);
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

    const descriptionHandler = event => {
      setDescription(event.target.value);
    };

    const priceHandler = event => {
      setPrice(event.target.value);
    };
    
    return (
        <React.Fragment>
            <form className="form-control" onSubmit={NewMenuSubmitHandler}>
                <input type="text" name="name" onChange={nameHandler} placeholder="Name" value={name} required />
                <input type="file" onChange={imageHandler} defaultValue='' required />
                <textarea name="description" onChange={descriptionHandler} placeholder="Description" value={description} required></textarea>
                <input type="number" name="price" onChange={priceHandler} placeholder="Price" value={price} />
                <button className="add-btn" type="submit" onClick={props.cancel}>ADD MENU</button>
                <a className="cancel-btn" onClick={props.cancel}>CANCEL</a>
            </form>
        </React.Fragment>
    );
}

export default NewMenu;
import React, { useState, useContext } from 'react';

import { AuthContext } from '../../Context/auth-context';

import axios from 'axios';

const UpdateMenu = props => {
    const auth = useContext(AuthContext);
    const [imageFile, setImageFile] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(null);

    const UpdateMenuSubmitHandler = async event => {
        event.preventDefault();
        const data = new FormData();
        data.append("mid", props.m.id);
        data.append("name", name);
        data.append("image", imageFile);
        data.append("description", description);
        data.append("price", price);
        try {
            await axios.patch(process.env.REACT_APP_BACKEND_URL + '/menu/', data, {
              headers: {
                'Authorization': 'Bearer ' + auth.token
              }
          });
        } catch (err) {
            console.log(err);
        }
        
        try {
          const response = await axios.get(process.env.REACT_APP_BACKEND_URL + '/menu/', data);
          props.onUpdateMenu(response.data.menus);
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
            <form className="form-control" onSubmit={UpdateMenuSubmitHandler}>
                <input type="text" name="name" onChange={nameHandler} placeholder="Name" defaultValue={props.m.name} required />
                <input type="file" onChange={imageHandler} />
                <textarea name="description" onChange={descriptionHandler} placeholder="Description" defaultValue={props.m.description} required></textarea>
                <input type="number" name="price" onChange={priceHandler} placeholder="Price" defaultValue={props.m.price} />
                <button className="add-btn" type="submit" onClick={props.cancel}>Update BREAKFAST</button>
                <a className="cancel-btn" onClick={props.cancel}>CANCEL</a>
            </form>
        </React.Fragment>
    );
}

export default UpdateMenu;
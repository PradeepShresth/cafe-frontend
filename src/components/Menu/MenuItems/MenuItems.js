import React, { useState, useContext, useEffect } from 'react';

import axios from 'axios';

import { AuthContext } from '../../Context/auth-context';

import Aux from '../../../hoc/Auxillary';
import Modal from '../../../UIElements/Modal/Modal';

import NewMenu from './NewMenu';
import UpdateMenu from './UpdateMenu';

const MenuItems = props => {
    const auth = useContext(AuthContext);
    const [menu_adding, setMenuAdding] = useState(false);
    const [menu_updating, setMenuUpdating] = useState(false);
    const [current_menu, setCurrentMenu] = useState({});
    const [menus, setMenus] = useState([]);

    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND_URL + '/menu')
            .then(response => {
                const menus  = response.data.menus;
                setMenus(menus);
            })
            .catch(error => {
                console.log(error);
            });
    }, [])

    
    const addNewMenuHandler = m => {
        setMenus(menus.concat(m));
    };

    const menuAddingHandler= () => {
        setMenuAdding(true);
    };

    const deleteMenuHandler = async mid => {
        const data = {mid}
        let updatedmenus;
        try {
            const response = await axios.post(process.env.REACT_APP_BACKEND_URL + '/delete', data, {
                headers: {
                  'Authorization': 'Bearer ' + auth.token
                }
            });
            updatedmenus = response.data.menus;
        } catch (err) {
            console.log(err);
        }
        setMenus(updatedmenus);
    }

    const updateMenuHandler = ( c_menu) => {
        setCurrentMenu(c_menu);
        setMenuUpdating(true);
    }

    const updateMenuStateHandler = newMenus => {
        setMenus(newMenus);
    }

    const menuUpdateCancelHandler = () => {
        setMenuUpdating(false);
    }

    const menuCancelHandler = () => {
        setMenuAdding(false);
    }

    return (
        <Aux>
            <Modal show={menu_adding} modalClosed={menuCancelHandler}>
                <NewMenu 
                    cancel={menuCancelHandler} 
                    onAddMenu={addNewMenuHandler} 
                    currentValue={props.currentValue}
                />
            </Modal>

            <Modal show={menu_updating} modalClosed={menuUpdateCancelHandler}>
                <UpdateMenu cancel={menuUpdateCancelHandler} onUpdateMenu={updateMenuStateHandler} m={current_menu} />
            </Modal>

            {props.showPoultryAndSeafood &&
                <div className="row menu-content">
                    {menus.filter(menu => menu.type === "poultry and seafood").map(menu => {
                            return (
                                <div key={menu.id} className="col menu-1-of-2 meal-col">
                                    <div className="col span-2-of-6 meal-image">
                                        <img src={`${process.env.REACT_APP_ASSET_URL}/${menu.image}`} alt='' />
                                    </div>
                                    <div className="col span-4-of-6 meal-info">
                                        <h3>
                                            {menu.name}
                                            {auth.isLoggedIn && (
                                                <i className="ion-settings" onClick={() => updateMenuHandler(menu)}></i>
                                            )}
                                            {auth.isLoggedIn && (
                                                <i className="ion-ios-close-outline" onClick={() => deleteMenuHandler(menu.id)}></i>
                                            )}
                                        </h3>
                                        <p>{menu.description}</p>
                                        {menu.price &&
                                            <h4>Rs. {menu.price}</h4>
                                        }
                                    </div>
                                </div>
                            );
                    })}
                    {auth.isLoggedIn && (
                        <div className="col menu-1-of-2 meal-col add-menu" onClick={menuAddingHandler}>
                            <h5>ADD SEAFOOD</h5>
                        </div>
                    )}
                </div>
            }

            {props.showBreakfast &&
                <div className="row menu-content">
                    {menus.filter(menu => menu.type === "breakfast").map(menu => {
                        return (
                            <div key={menu.id} className="col menu-1-of-2 meal-col">
                                <div className="col span-2-of-6 meal-image">
                                    <img src={`${process.env.REACT_APP_ASSET_URL}/${menu.image}`} alt='' />
                                </div>
                                <div className="col span-4-of-6 meal-info">
                                    <h3>
                                        {menu.name}
                                        {auth.isLoggedIn && (
                                            <i className="ion-settings" onClick={() => updateMenuHandler(menu.id, menu)}></i>
                                        )}
                                        {auth.isLoggedIn && (
                                            <i className="ion-ios-close-outline" onClick={() => deleteMenuHandler(menu.id)}></i>
                                        )}
                                    </h3>
                                    <p>{menu.description}</p>
                                    {menu.price &&
                                        <h4>Rs. {menu.price}</h4>
                                    }
                                </div>
                            </div>
                        );
                    })}
                    {auth.isLoggedIn && (
                        <div className="col menu-1-of-2 meal-col add-menu" onClick={menuAddingHandler}>
                            <h5>ADD BREAKFAST</h5>
                        </div>
                    )}
                </div>
            }
            {props.showDinner &&
                <div className="row menu-content">
                    {menus.filter(menu => menu.type === "dinner").map(menu => {
                        return (
                            <div key={menu.id} className="col menu-1-of-2 meal-col">
                                <div className="col span-2-of-6 meal-image">
                                    <img src={`${process.env.REACT_APP_ASSET_URL}/${menu.image}`} alt='' />
                                </div>
                                <div className="col span-4-of-6 meal-info">
                                    <h3>
                                        {menu.name}
                                        {auth.isLoggedIn && (
                                            <i className="ion-settings" onClick={() => updateMenuHandler(menu.id, menu)}></i>
                                        )}
                                        {auth.isLoggedIn && (
                                            <i className="ion-ios-close-outline" onClick={() => deleteMenuHandler(menu.id)}></i>
                                        )}
                                    </h3>
                                    <p>{menu.description}</p>
                                    {menu.price &&
                                        <h4>Rs. {menu.price}</h4>
                                    }
                                </div>
                            </div>
                        );
                    })}
                    {auth.isLoggedIn && (
                        <div className="col menu-1-of-2 meal-col add-menu" onClick={menuAddingHandler}>
                            <h5>ADD DINNER</h5>
                        </div>
                    )}
                </div>
            }

        </Aux>
    );
};

export default MenuItems;
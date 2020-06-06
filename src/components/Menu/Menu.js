import React, { Component } from 'react';

import MenuItems from './MenuItems/MenuItems';

import './Menu.css';

class Menu extends Component {
    state = {
        showPoultryAndSeafood: true,
        showBreakfast: false,
        showDinner: false,
        currentValue: 'poultry and seafood',
    }

    showPoultryAndSeafoodHandler = () => {
        this.setState({ showPoultryAndSeafood: true });
        this.setState({ showBreakfast: false });
        this.setState({ showDinner: false });
        this.setState({currentValue: 'poultry and seafood'});
    }

    showBreakfastHandler = () => {
        this.setState({ showPoultryAndSeafood: false });
        this.setState({ showBreakfast: true });
        this.setState({ showDinner: false });
        this.setState({currentValue: 'breakfast'});
    }

    showDinnerHandler = () => {
        this.setState({ showPoultryAndSeafood: false });
        this.setState({ showBreakfast: false });
        this.setState({ showDinner: true });
        this.setState({currentValue: 'dinner'});
    }

    render () {
        return (
            <section className="section-menu js--section-menu" id="menu">
                <div class="row">
                    <h2>Our Menu</h2>
                </div>
                <div className="menu-buttons">
                    <a 
                        className={this.state.showPoultryAndSeafood === true ? 'menu-button menu-selected' : 'menu-button'}
                        onClick={this.showPoultryAndSeafoodHandler}
                    >PoultryAndSeafood</a> 
                    <a 
                        className={this.state.showBreakfast === true ? 'menu-button menu-selected' : 'menu-button'}
                        onClick={this.showBreakfastHandler}
                    >Breakfast</a>
                    <a 
                        className={this.state.showDinner === true ? 'menu-button menu-selected' : 'menu-button'}
                        onClick={this.showDinnerHandler}
                    >Dinner</a>
                </div>

                <MenuItems
                    showPoultryAndSeafood={this.state.showPoultryAndSeafood}
                    showBreakfast={this.state.showBreakfast}
                    showDinner={this.state.showDinner}
                    currentValue={this.state.currentValue}
                />
            </section>
        );
    }
};

export default Menu;
import React, { useState, useContext } from 'react';

import ErrorModal from '../UIElements/ErrorModal/ErrorModal';

import { AuthContext } from '../components/Context/auth-context';

const Login = props => {
    const auth = useContext(AuthContext);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState();

    const loginSubmitHandler = async event => {
        event.preventDefault();
        const data = {
            name: name,
            password: password
        }
        try { 
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/login', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            setName('');
            setPassword('');
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message);
            }
            auth.login(responseData.userId, responseData.token);
        } catch (err) {
            console.log(err);
            setError(err.message || 'Something went wrong!! Please try again');
        }
    }

    const nameHandler = event => {
        setName(event.target.value);
    }

    const passwordHandler = event => {
        setPassword(event.target.value);
    }

    const errorHandler = () => {
        setError(null);
    }

    return (
        <React.Fragment>
            <ErrorModal
                error={error}
                onClear={errorHandler}
                modalClosed={errorHandler}
            />
            <section className="section-form">
                <div className="row">
                    <h2>Login</h2>
                </div>
                <div className="row">
                    <form className="contact-form" onSubmit={loginSubmitHandler}>
                        <div className="row">
                            <div className="col span-1-of-3">
                                <label>Name</label>
                            </div>
                            <div className="col span-2-of-3">
                                <input type="text" placeholder="Your name" onChange={nameHandler}  value={name} required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col span-1-of-3">
                                <label>Password</label>
                            </div>
                            <div className="col span-2-of-3">
                                <input type="text" placeholder="Password" onChange={passwordHandler} value={password} required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col span-1-of-3"></div>
                            <div className="col span-2-of-3">
                                <input type="submit" value="Login" />
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </React.Fragment>
    );
}

export default Login;
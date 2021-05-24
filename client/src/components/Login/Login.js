import React, { useState } from 'react';
import PropTypes from 'prop-types';


const axios = require('axios');
const userState = {
    user: '',
    email: '',
    password: '',
    roles: [''],
}
const loginStateFull = {
    user: '',
    password: '',
}
export default function Login() {
    const [state, setState] = useState(userState);
    const resetUserInputs = () => {
        setState(userState)
    }
    const [loginState, setLoginState] = useState(loginStateFull)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const resetLoginInputs = () => {
        setLoginState(loginStateFull)
    }
    const submitLogin = (e) => {
        e.preventDefault();
        const payload = {
            username: loginState.username,
            password: loginState.password,
        };
        console.log('login: ', payload)
        axios({
            url: 'api/auth/signin',
            method: 'POST',
            data: payload,
        })
            .then((response) => {
                console.log(response.data.accessToken, 'Logged in')
                localStorage.setItem('x-access-token', response.data.accessToken)
                setIsLoggedIn(true)
                resetLoginInputs()
                window.location.reload(true);
            })
            .catch((error) => {
                console.log(error, 'Not logged in')
                setIsLoggedIn(false)
            })
    }

    const submit = (e) => {
        e.preventDefault();
        const payload = {
            username: state.username,
            email: state.email,
            password: state.password,
            roles: state.roles,
        };
        console.log('name: ', payload)
        axios({
            url: 'api/auth/signup',
            method: 'POST',
            data: payload
        })
            .then(() => {
                console.log('Signed up')
                resetUserInputs()
                // refetch()
            })
            .catch(() => {
                console.log('Sign up failed')
            })
    }
    return (
        <div>
            <h1>Signup</h1>
            <div>Create user</div>
            <div>
                <input
                    type='text'
                    name='userName'
                    placeholder='User Name'
                    value={state.username}
                    onChange={e => setState({ ...state, username: e.target.value })}>
                </input>
                <input
                    type='text'
                    name='email'
                    placeholder='Email'
                    value={state.email}
                    onChange={e => setState({ ...state, email: e.target.value })}>
                </input>
                <input
                    type='text'
                    name='password'
                    placeholder='password'
                    value={state.password}
                    onChange={e => setState({ ...state, password: e.target.value })}>
                </input>
                <input
                    type='text'
                    name='roles'
                    placeholder='roles'
                    value={state.roles}
                    onChange={e => setState({ ...state, roles: [e.target.value] })}>
                </input>
                <button onClick={submit}>Create new username</button>
            </div>
            <h1>Login</h1>
            <input
                type='text'
                name='userName'
                placeholder='User Name'
                value={loginState.username}
                onChange={e => setLoginState({ ...loginState, username: e.target.value })}>
            </input>
            <input
                type='text'
                name='password'
                placeholder='password'
                value={loginState.password}
                onChange={e => setLoginState({ ...loginState, password: e.target.value })}>
            </input>
            <button onClick={submitLogin}>Login</button>
            { isLoggedIn && <div>Loggedin</div>}
        </div>
    )
}

// Login.propTypes = {
//     setToken: PropTypes.func.isRequired
// }
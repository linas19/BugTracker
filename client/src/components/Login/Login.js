import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    signupContainer: {
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '5px 5px 15px 5px #000000',
        paddingBottom: '10px',
        background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 2%, rgba(0,208,252,1) 16%, rgba(0,212,255,1) 49%)'
    },
    loginContainer: {
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '5px 5px 15px 5px #000000',
        paddingBottom: '10px',
        background: 'linear-gradient(90deg, rgba(19,36,0,1) 0%, rgba(90,121,9,1) 2%, rgba(73,252,0,1) 23%)'
    },
    button: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '30px 30px',
        marginTop: '20px'
    },
});

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
        axios({
            url: 'api/auth/signin',
            method: 'POST',
            data: payload,
        })
            .then((response) => {
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
        axios({
            url: 'api/auth/signup',
            method: 'POST',
            data: payload
        })
            .then(() => {
                resetUserInputs()
                // refetch()
            })
            .catch(() => {
                console.log('Sign up failed')
            })
    }
    const classes = useStyles();

    return (

        <Container>
            <Container maxWidth="sm" className={classes.signupContainer}>
                <h1>Signup</h1>
                <div>
                    <TextField id="standard-basic"
                        label="User name"
                        variant="outlined"
                        type='text'
                        name='userName'
                        placeholder='User Name'
                        value={state.username}
                        onChange={e => setState({ ...state, username: e.target.value })}
                    />
                    <TextField id="standard-basic"
                        label="Email"
                        type='text'
                        variant="outlined"
                        name='email'
                        placeholder='Email'
                        value={state.email}
                        onChange={e => setState({ ...state, email: e.target.value })}
                    />
                    <TextField id="standard-basic" label="Password" type='text' variant="outlined"
                        type='text'
                        name='password'
                        placeholder='password'
                        value={state.password}
                        onChange={e => setState({ ...state, password: e.target.value })}
                    />
                    <TextField id="standard-basic"
                        label="Select a role"
                        type='text'
                        variant="outlined"
                        name='roles'
                        placeholder='roles'
                        value={state.roles}
                        onChange={e => setState({ ...state, roles: [e.target.value] })}
                    />
                    <Button variant="contained" color="primary" onClick={submit} className={classes.button}>
                        Create new user
                    </Button>
                </div>
            </Container>
            <Container maxWidth="sm" className={classes.loginContainer}>
                <h1>If you already have an account, please login</h1>
                <TextField id="standard-basic" label="User Name" type='text' variant="outlined"
                    name='userName'
                    placeholder='User Name'
                    value={loginState.username}
                    onChange={e => setLoginState({ ...loginState, username: e.target.value })} />
                <TextField id="standard-basic" label="Password" type='text' variant="outlined"
                    name='password'
                    placeholder='password'
                    value={loginState.password}
                    onChange={e => setLoginState({ ...loginState, password: e.target.value })} />
                <Button variant="contained" color="primary" onClick={submitLogin} className={classes.button}>
                    Login
                </Button>
                {isLoggedIn && <div>Loggedin</div>}
            </Container>
        </Container>
    )
}

// Login.propTypes = {
//     setToken: PropTypes.func.isRequired
// }
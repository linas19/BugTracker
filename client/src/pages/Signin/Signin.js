import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const axios = require('axios');
const loginStateFull = {
    user: '',
    password: '',
}
export default function Signin() {
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

    const classes = useStyles();

    return (

        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        autoFocus
                        id="standard-basic"
                        label="User Name"
                        type='text'
                        variant="outlined"
                        name='userName'
                        placeholder='User Name'
                        value={loginState.username}
                        onChange={e => setLoginState({ ...loginState, username: e.target.value })}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        name='password'
                        placeholder='Password'
                        value={loginState.password}
                        onChange={e => setLoginState({ ...loginState, password: e.target.value })}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={submitLogin}
                    >
                        Sign In
                    </Button>
                </form>
            </div>
            {isLoggedIn && <div>Loggedin</div>}
        </Container>
    )
}
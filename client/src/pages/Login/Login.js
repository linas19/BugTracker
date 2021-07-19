import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Signup from '../Signup/Sigup'
import Signin from '../Signin/Signin'
import PasswordReminder from '../ChangePassword/ChangePassword'

import Grid from '@material-ui/core/Grid';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import ChangePassword from '../ChangePassword/ChangePassword';
export default function Login() {
    const [signin, setSignin] = useState(1)
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            {
                signin === 1 && (
                    <Grid container>
                        <Signin />
                        <Grid item xs>
                            <Button variant="body2" onClick={() => {setSignin(3)}}>
                                Forgot password?
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="body2" onClick={() => { setSignin(2) }}>
                                Don't have an account? Sign up.
                            </Button>
                        </Grid>
                    </Grid>
                )
            }
            {
                signin === 2 && (
                    <Grid container>
                        <Signup />
                        <Grid item xs>
                            <Button variant="body2" onClick={() => { setSignin(1) }}>
                                Already have an account? Sign in.
                            </Button>
                        </Grid>
                    </Grid>
                )
            }
            {
                signin === 3 && (
                    <Grid container>
                        <ChangePassword />
                        <Grid item xs>
                            <Button size="small" variant="body2" onClick={() => { setSignin(1) }}>
                                Sign in
                            </Button>
                        </Grid>
                        <Grid item xs>
                            <Button size="small" variant="body2" onClick={() => { setSignin(2) }}>
                                Sign up
                            </Button>
                        </Grid>
                    </Grid>
                )
            }


        </Container>
    )
}
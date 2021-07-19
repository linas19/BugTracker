import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import CssBaseline from '@material-ui/core/CssBaseline';
import Signup from '../Signup/Sigup'
import Signin from '../Signin/Signin'
import ChangePassword from '../ChangePassword/ChangePassword'
import Grid from '@material-ui/core/Grid';

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
                            <Button color="primary" onClick={() => {setSignin(3)}}>
                                Forgot password
                            </Button>
                        </Grid>
                        <Grid item xs>
                            <Button color="primary" onClick={() => { setSignin(2) }}>
                                Sign up
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
                            <Button color="primary" onClick={() => { setSignin(1) }}>
                                Sign in
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
                            <Button color="primary" onClick={() => { setSignin(1) }}>
                                Sign in
                            </Button>
                        </Grid>
                        <Grid item xs>
                            <Button color="primary" onClick={() => { setSignin(2) }}>
                                Sign up
                            </Button>
                        </Grid>
                    </Grid>
                )
            }


        </Container>
    )
}
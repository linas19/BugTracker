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
import AssignmentTurnedInTwoToneIcon from '@material-ui/icons/AssignmentTurnedInTwoTone';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

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
const userState = {
    user: '',
    email: '',
    password: '',
    roles: [''],
}

export default function Signup() {
    const [state, setState] = useState(userState);
    const resetUserInputs = () => {
        setState(userState)
    }
    const [signupSuccess, setsignupSuccess] = useState()
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
                setsignupSuccess(true)
                // refetch()
            })
            .catch(() => {
                setsignupSuccess(false)
                console.log('Sign up failed')
            })
    }
    const classes = useStyles();
    const [openSignupAlert, setOpenSignupAlert] = React.useState(true);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <AssignmentTurnedInTwoToneIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                autoFocus
                                id="standard-basic"
                                label="User name"
                                variant="outlined"
                                type='text'
                                name='userName'
                                placeholder='User Name'
                                value={state.username}
                                onChange={e => setState({ ...state, username: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Select
                                variant="outlined"
                                required
                                // fullWidth
                                labelId="demo-simple-select-label"
                                id="standard-basic"
                                value={state.roles}
                                onChange={e => setState({ ...state, roles: [e.target.value] })}
                            >
                                <MenuItem value="" disabled>
                                    Select a role*
                                </MenuItem>
                                <MenuItem value="moderator">Moderator</MenuItem>
                                <MenuItem value="user">User</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Email Address"
                                autoComplete="email"
                                id="standard-basic"
                                type='email'
                                variant="outlined"
                                name='email'
                                placeholder='Email'
                                value={state.email}
                                onChange={e => setState({ ...state, email: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                type="password"
                                autoComplete="current-password"
                                id="standard-basic"
                                label="Password"
                                variant="outlined"
                                name='password'
                                placeholder='Password'
                                value={state.password}
                                onChange={e => setState({ ...state, password: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive updates on my tickets and projects via email."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={submit}
                    >
                        Sign Up
                    </Button>
                </form>
            </div>
            <Container maxWidth="sm" className={classes.signupContainer}>
            </Container>
            {signupSuccess === true && (
                <Collapse in={openSignupAlert}>
                    <Alert
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpenSignupAlert(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                    >
                        Signed up successfully
                    </Alert>
                </Collapse>
            )
            }
            {signupSuccess === false && (
                <Collapse in={openSignupAlert}>
                    <Alert severity="error"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpenSignupAlert(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                    >
                        Signup failed, please check form or contact admin!
                    </Alert>
                </Collapse>
            )
            }
        </Container>
    )
}
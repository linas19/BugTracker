import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';

import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Projects from '../../pages/Projects/Projects.js'
import ProjectUsers from '../../pages/ProjectUsers/ProjectUsers.js'
import RoleAssignment from '../../pages/RoleAssignment/RoleAssignment.js'
import Tickets from '../../pages/Tickets/Tickets.js'
import UserProfile from '../../pages/UserProfile/UserProfile.js'
import Home from '../../pages/Home/Home.js'
// import styles from './index.module.scss'
import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
// import Login from '../../pages/Login/Login.js';
import DvrIcon from '@material-ui/icons/Dvr';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import BugReportIcon from '@material-ui/icons/BugReport';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

const axios = require('axios');

function TopNavbar() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const [username, setUsername] = useState('')
    axios({
        url: 'api/currentUser',
        method: 'GET',
        headers: {
            ["x-access-token"]: localStorage.getItem('x-access-token')
        }
    })
        .then((response) => {
            setUsername(response.data.username)
        })
        .catch((error) => {
            console.log(error, 'Not logged in')
        })
    const logout = () => {
        localStorage.removeItem('x-access-token')
        window.location.reload(true);
    }

    return (
        <div className={classes.root}>
            {/* <Router> */}
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, {
                                [classes.hide]: open,
                            })}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Welcome, {username}
                        </Typography>
                        <Button color="inherit" onClick={logout}>Logout</Button>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        }),
                    }}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <Link to="/">
                            <ListItem button>
                                <ListItemIcon><DvrIcon /></ListItemIcon>
                                <ListItemText primary='Dashboard' />
                            </ListItem>
                        </Link>
                        <Link to="/roles">
                            <ListItem button>
                                <ListItemIcon><SupervisorAccountIcon /></ListItemIcon>
                                <ListItemText primary='Manage roles' />
                            </ListItem>
                        </Link>
                        <Link to="/users">
                            <ListItem button>
                                <ListItemIcon><AssignmentIndIcon /></ListItemIcon>
                                <ListItemText primary='Manage users' />
                            </ListItem>
                        </Link>
                        <Link to="/projects">
                            <ListItem button>
                                <ListItemIcon><AccountTreeIcon /></ListItemIcon>
                                <ListItemText primary='Manage projects' />
                            </ListItem>
                        </Link>
                        <Link to="/tickets">
                            <ListItem button>
                                <ListItemIcon><BugReportIcon /></ListItemIcon>
                                <ListItemText primary='Manage tickets' />
                            </ListItem>
                        </Link>
                        <Link to="/profile">
                            <ListItem button>
                                <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                                <ListItemText primary='My profile' />
                            </ListItem>
                        </Link>
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <div>
                        <div>
                            {/* <Switch>
                                <Route path="/roles">
                                    <RoleAssignment />
                                </Route>
                                <Route path="/users">
                                    <ProjectUsers />
                                </Route>
                                <Route path="/projects">
                                    <Projects />
                                </Route>
                                <Route path="/tickets">
                                    <Tickets />
                                </Route>
                                <Route path="/profile">
                                    <UserProfile />
                                </Route>
                                <Route path="/">
                                    <Home />
                                </Route>
                            </Switch> */}
                        </div>
                    </div>

                </main>
            {/* </Router> */}
        </div>
    )
}

export default TopNavbar
import TopNavbar from '../../components/TopNavbar/TopNavbar.js'
import Container from '@material-ui/core/Container';
import React, { useState } from "react";
import Login from '../Login/Login';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link
} from "react-router-dom";
import Projects from '../../pages/Projects/Projects.js'
import ProjectUsers from '../../pages/ProjectUsers/ProjectUsers.js'
import RoleAssignment from '../../pages/RoleAssignment/RoleAssignment.js'
import Tickets from '../../pages/Tickets/Tickets.js'
import UserProfile from '../../pages/UserProfile/UserProfile.js'
import Home from '../../pages/Home/Home.js'
var jwt = require('jsonwebtoken');
const axios = require('axios');

export default function Dashboard() {
    const token = localStorage.getItem('x-access-token');
    const decoded = jwt.decode(token)
    if (!token) {
        return <Login />
    }

    if (Date.now() > decoded.exp * 1000) {
        return <Login />
    }

    return (
        <Container>
            <Router>
            <TopNavbar />
                <Switch>
                    <Route exact path="/"
                        render={() => {
                            return (
                                !token && Date.now() > decoded.exp * 1000 ?
                                <Redirect to="/" /> : <Redirect to="/Home" />
                            )
                        }}
                        />
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
                </Switch>
            </Router>
        </Container>
    )
}


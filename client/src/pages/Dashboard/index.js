import Projects from '../Projects/Projects.js'
import ProjectUsers from '../ProjectUsers/ProjectUsers.js'
import RoleAssignment from '../RoleAssignment/RoleAssignment.js'
import Tickets from '../Tickets/Tickets.js'
import UserProfile from '../UserProfile/UserProfile.js'
import Home from '../Home/Home.js'
import TopNavbar from '../../components/TopNavbar/TopNavbar.js'
import styles from './index.module.scss'
import Container from '@material-ui/core/Container';
import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Login from '../../components/Login/Login.js';
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
            <TopNavbar />
        </Container>
    )
}


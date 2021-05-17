import Projects from '../Projects/Projects.js'
import ProjectUsers from '../ProjectUsers/ProjectUsers.js'
import RoleAssignment from '../RoleAssignment/RoleAssignment.js'
import Tickets from '../Tickets/Tickets.js'
import UserProfile from '../UserProfile/UserProfile.js'
import Home from '../Home/Home.js'
import TopNavbar from '../../components/TopNavbar/TopNavbar.js'
import LeftNavbar from '../../components/LeftNavbar/LeftNavbar.js'
import styles from './index.module.scss'
import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

function Dashboard() {
  
    return (
        <Router>
            <div>
                <TopNavbar />
                <div className={styles.dashboardContainer}>
                    <LeftNavbar />
                    <Switch>
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
                    </Switch>
                </div>
            </div>
        </Router>
    )
}

export default Dashboard
import styles from './TopNavbar.module.scss'
import React, { useState } from "react";
const axios = require('axios');

function TopNavbar() {
    const [username, setUsername] = useState('')
    axios({
        url: 'api/currentUser',
        method: 'GET',
        headers: {
            ["x-access-token"]: localStorage.getItem('x-access-token')
        }
    })
        .then((response) => {
            console.log(response.data.username, 'Logged in')
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
        <div className={styles.topNavbar}>
            <div>ICON</div>
            <div>Welcome, {username}</div>
            <button onClick={logout}>LOGOUT</button>
        </div>
    )
}

export default TopNavbar
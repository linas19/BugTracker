import styles from './TopNavbar.module.scss'
import React from "react";

function TopNavbar() {
    return (
        <div className={styles.topNavbar}>
            <div>ICON</div>
            <div>Welcome, blahblah</div>
            <div>Logged In as: BLAH</div>
        </div>
    )
}

export default TopNavbar
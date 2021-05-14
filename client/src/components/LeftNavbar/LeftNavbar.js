import styles from './LeftNavbar.module.scss'
import {
    Link
} from "react-router-dom";
function LeftNavbar() {
    return (
        <div className={styles.container}>
            <div>
                <Link to="/">Dashboard Home</Link>
            </div>
            <div>
                <Link to="/roles">Manage Role Assignments</Link>
            </div>
            <div>
                <Link to="/users">My Project Users</Link>
            </div>
            <div>
                <Link to="/projects">My Projects</Link>
            </div>
            <div>
                <Link to="/tickets">My Tickets</Link>
            </div>
            <div>
                <Link to="/profile">User Profile</Link>
            </div>
        </div>

    )
}

export default LeftNavbar
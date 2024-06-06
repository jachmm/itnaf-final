    import { NavLink } from 'react-router-dom';
    import "../App.css";

    const NavBar = ({ loggedIn, onLogout, user }) => {

        const handleLogout = () => {
            localStorage.setItem('loggedIn', 'false');
            localStorage.setItem('username', '')
            onLogout();
        }

        return (
            <nav className="navbar">
                <img src='Logo.png' style={{width: '150px'}}/>
                <ul className="nav-list">
                    <li className="nav-item">
                        <NavLink to="/itnaf-final/" className="nav-link" >Home</NavLink>
                    </li>
                    {!loggedIn && (
                        <li className="nav-item">
                            <NavLink to="/itnaf-final/login" className="nav-link" >Login</NavLink>
                        </li>
                    )}
                    {!loggedIn && (
                        <li className="nav-item">
                            <NavLink to="/itnaf-final/register" className="nav-link" >Register</NavLink>
                        </li>
                    )}
                    {loggedIn && (
                        <li className="nav-item">
                            <NavLink to={`/itnaf-final/users/${user}`} className="nav-link" >My Profile</NavLink>
                        </li>
                    )}
                </ul>
                {loggedIn && (
                    <div className="nav-item logoutWrapper">
                        <button className="logout-button" onClick={handleLogout}>Logout</button>
                    </div>
                )}
            </nav>
        );
    }

    export default NavBar;

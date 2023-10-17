import { useNavigate, Link } from "react-router-dom";
import './index.css';
import Cookies from "js-cookie";



const Header = ()=>{
    let navigate = useNavigate();

    const onClickLogout=()=>{
        Cookies.remove('jwt_token')
        navigate("/auth")
    }

    return(
        <nav className="navbar-container p-2">
            <div>
                <Link to="/" className="link-item">
                    <img
                        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                        className="website-logo"
                        alt="website logo"
                    />
                </Link>
            </div>
            <ul className="header-list-items">
            <Link to="/" className="link-item">
                    <li className="home-heading home">Home</li>
            </Link>
            <Link to="/jobs" className="link-item">
                    <li className="jon-heading home">Jobs</li>
            </Link>
            </ul>
            <div>
                <button type="button" className="logout-button" onClick={onClickLogout}>
                    Logout
                </button>
            </div>
        </nav>
    )
}

export default Header;
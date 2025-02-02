import { Link } from "react-router-dom"
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "./navbar.css"

export const Navbar = () => {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.removeItem("userID");
        navigate("/auth")
    }
    return (
        <div className="navbar">
            <Link to="/" className="navbar-logo">NutriPlan</Link>
            <Link to="/create" className="navbar-item">Create Recipe</Link>
            <Link to="/generate" className="navbar-item">Recipe Generator</Link>
            {!cookies.access_token ? 
            (<Link to="/auth" className="navbar-item">Login/Register</Link>) 
            : (
                <button onClick={logout} className="navbar-item">Logout</button>
            )}
        </div>
    );
};
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header>
            <Link to="/">Logo</Link>

            <div>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>
        </header>
    )
}
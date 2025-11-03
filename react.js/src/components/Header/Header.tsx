import { Link } from "react-router-dom";

import style from "./Header.module.scss"

import Button from "../Button/Button";

export default function Header() {
    return (
        <header className={style.header}>
            <Link to="/">Logo</Link>

            <div className={style.cta}>
                <Button type="link" variant="link" href="/login">Login</Button>
                <Button type="link" variant="button" href="/register" size="s">Register</Button>
            </div>
        </header>
    )
}
import { Link } from "react-router-dom";

import { useUser } from "../../context/UserContext";

import style from "./Header.module.scss"

import Button from "../Button/Button";

export default function Header() {
    const { user, logout } = useUser();

    return (
        <header className={style.header}>
            <Link to="/">Logo</Link>

            <div className={style.cta}>
                {
                    user ?
                    <>
                        <p>compte</p>
                        <Button type="button" variant="buttonBlack" action={logout} size="s">Logout</Button>
                    </>
                    :
                    <>
                        <Button type="link" variant="link" href="/login">Login</Button>
                        <Button type="link" variant="button" href="/register" size="s">Register</Button>
                    </>
                }
            </div>
        </header>
    )
}
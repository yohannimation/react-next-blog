import { useState } from "react";

import style from "./FormLogin.module.scss";

import Input from "../../components/Input/Input"
import Button from "../Button/Button";

export default function FormLogin() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const triggerLogin = () => {
        console.log(username, password)
    }

    return (
        <form className={style.form}>
            <Input
                id="username"
                label="Username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <Input
                id="password"
                label="Password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="button" variant="button" action={triggerLogin} size="s">Login</Button>
        </form>
    )
}
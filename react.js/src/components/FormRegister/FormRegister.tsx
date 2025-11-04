import { useState } from "react";

import style from "./FormRegister.module.scss";

import Input from "../../components/Input/Input"
import Button from "../Button/Button";

export default function FormRegister() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const triggerRegister = () => {
        if (password == confirmPassword) {
            console.log(username, password, confirmPassword)
        } else {
            console.error("password and confirm password not match")
        }
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
            <Input
                id="confirmPassword"
                label="Confirm password"
                type="password"
                placeholder="ConfirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button type="button" variant="button" action={triggerRegister} size="s">Register</Button>
        </form>
    )
}
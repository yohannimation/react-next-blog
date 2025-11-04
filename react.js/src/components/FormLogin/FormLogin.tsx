import { useState } from "react";

import style from "./FormLogin.module.scss";

import Input from "../../components/Input/Input"
import Button from "../Button/Button";
import Loader from "../Loader/Loader";

import { useUser } from "../../context/UserContext";

export default function FormLogin() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const { login } = useUser();

    const triggerLogin = async () => {
        setLoading(true);

        try {
            const res = await fetch("http://localhost:3000/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || "Login failed");

            login({
                id: data.user.id,
                name: data.user.username,
                token: data.token,
            });

            setUsername("");
            setPassword("");
        } catch (err: any) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className={style.form}>
            {
                loading ?
                    <Loader />
                    :
                    <>
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
                </>
            }
        </form>
    )
}
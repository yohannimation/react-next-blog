import { useState } from "react";

import style from "./FormRegister.module.scss";

import Input from "../../components/Input/Input"
import Button from "../Button/Button";
import Loader from "../Loader/Loader";

export default function FormRegister() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const triggerRegister = async () => {
        if (password !== confirmPassword) {
            console.log("Password and confirm password do not match");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("http://localhost:3000/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to register");
            }

            // Utilisateur créé avec succès
            setUsername("");
            setPassword("");
            setConfirmPassword("");
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
                        <Input
                            id="confirmPassword"
                            label="Confirm password"
                            type="password"
                            placeholder="ConfirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <Button type="button" variant="button" action={triggerRegister} size="s">Register</Button>
                    </>
            }
        </form>
    )
}
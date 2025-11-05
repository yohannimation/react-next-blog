import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';

import style from "./FormLogin.module.scss";

import Input from "../../components/Input/Input"
import Button from "../Button/Button";
import Loader from "../Loader/Loader";

import { useUser } from "../../context/UserContext";

export default function FormLogin() {
    const [loading, setLoading] = useState(false)
    const { login } = useUser();
    
    const validationSchema = Yup.object({
        username: Yup.string()
            .required('Username is required'),
        password: Yup.string()
            .required('Password is required')
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        }, 
        validationSchema,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values) => {
            setLoading(true);

            try {
                const res = await fetch("https://blog-app.yohannimation.fr/api/users/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values),
                });

                const data = await res.json();
                
                if (!res.ok) {
                    throw new Error(data.error || "Login failed");
                }

                login({
                    id: data.user.id,
                    name: data.user.username,
                    token: data.token,
                });
            } catch (err: any) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
    })

    return (
        <form onSubmit={formik.handleSubmit} className={style.form}>
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
                        value={formik.values.username}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.username && <p>{formik.errors.username}</p>}
                    <Input
                        id="password"
                        label="Password"
                        type="password"
                        placeholder="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.password && <p>{formik.errors.password}</p>}
                    <Button type="button" variant="button" action={formik.handleSubmit} size="s">Login</Button>
                </>
            }
        </form>
    )
}
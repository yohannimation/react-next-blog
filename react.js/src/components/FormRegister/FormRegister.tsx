import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';

import style from "./FormRegister.module.scss";

import Input from "../../components/Input/Input"
import Button from "../Button/Button";
import Loader from "../Loader/Loader";

export default function FormRegister() {
    const [loading, setLoading] = useState(false)

    const validationSchema = Yup.object({
        username: Yup.string()
            .required('Username is required'),
        password: Yup.string()
            .required('Password is required'),
        confirmPassword: Yup.string()
            .required('Confirm password is required')
            .oneOf([Yup.ref("password")], "Passwords must match"),
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            confirmPassword: '',
        }, 
        validationSchema,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values) => {
            setLoading(true);

            try {
                const res = await fetch("http://localhost:3000/api/users", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values),
                });

                if (!res.ok) {
                    const data = await res.json();
                    throw new Error(data.error || "Failed to register");
                }
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
                        <Input
                            id="confirmPassword"
                            label="Confirm password"
                            type="password"
                            placeholder="ConfirmPassword"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.confirmPassword && <p>{formik.errors.confirmPassword}</p>}
                        <Button type="button" variant="button" size="s" action={formik.handleSubmit}>Register</Button>
                    </>
            }
        </form>
    )
}
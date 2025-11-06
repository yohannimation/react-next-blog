import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';

import type { PostFormModalInterface } from "./FormPost.interface";

import style from "./FormPost.module.scss";

import Button from "../Button/Button";
import Input from "../Input/Input";
import Textarea from "../Textarea/Textarea";
import Loader from "../Loader/Loader";

import { useUser } from "../../context/UserContext";
import Checkbox from "../Checkbox/Checkbox";

export default function FormPost({ post, onClose }: PostFormModalInterface) {
    const VITE_BACK_URL = import.meta.env.VITE_BACK_URL;
    
    const [loading, setLoading] = useState(false);
    const { user } = useUser();

    const validationSchema = Yup.object({
        title: Yup.string()
            .required('Title is required'),
        content: Yup.string()
            .required('Content is required'),
        private: Yup.boolean()
    });

    const formik = useFormik({
        initialValues: {
            title: post?.title ?? "",
            content: post?.content ?? "",
            private: false,
        },
        validationSchema,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values) => {
            setLoading(true);

            try {
                if (!user) throw new Error("User error");
    
                const newPost = {
                    title: values.title,
                    content: values.content,
                    private: values.private,
                    author: user.id,
                };
    
                const res = await fetch(`${VITE_BACK_URL}/api/posts`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${user.token}`,
                    },
                    body: JSON.stringify(newPost),
                });
    
                if (!res.ok) throw new Error("Erreur lors de l’ajout du post");
    
                // formik.handleReset(initialValues);
                onClose();
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
    })

    const close = () => {
        // formik.handleReset(initialValues);
        onClose();
    }

    return (
        <div className={style.root}>
            <span className={style.blurredBg}></span>

            <div className={style.modal}>
                {
                    user ?
                        loading ?
                            <Loader />
                        :
                            <>
                                <Input
                                    id="title"
                                    label="Title"
                                    type="text"
                                    placeholder="Title name"
                                    value={formik.values.title}
                                    onChange={formik.handleChange}
                                />
                                {formik.errors.title && <p>{formik.errors.title}</p>}
                                <Textarea
                                    id="content"
                                    label="Content"
                                    placeholder="Content"
                                    value={formik.values.content}
                                    onChange={formik.handleChange}
                                />
                                {formik.errors.content && <p>{formik.errors.content}</p>}
                                <Checkbox
                                    id="private"
                                    label="Private"
                                    checked={formik.values.private}
                                    onChange={formik.handleChange}
                                />
                            </>
                    :
                    <h2>To add a post, you must be connected</h2>
                }
                <div className={style.modalCta}>
                    <Button type="button" variant="buttonBlack" action={close} size="m">Cancel</Button>
                    {user && <Button type="button" variant="button" action={formik.handleSubmit} size="m">Save</Button>}
                </div>
            </div>
        </div>
    )
}
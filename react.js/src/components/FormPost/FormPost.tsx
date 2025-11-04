import { useState } from "react";

import type { PostFormModalInterface } from "./FormPost.interface";

import style from "./FormPost.module.scss";

import Button from "../Button/Button";
import Input from "../Input/Input";
import Textarea from "../Textarea/Textarea";
import Loader from "../Loader/Loader";

import { useUser } from "../../context/UserContext";

export default function FormPost({ post, onClose }: PostFormModalInterface) {
    const [input, setInput] = useState(post?.title ?? "");
    const [textarea, setTextarea] = useState(post?.content ?? "");
    const [loading, setLoading] = useState(false);
    const { user } = useUser();

    const resetForm = () => {
        setInput("")
        setTextarea("")
    }

    const close = () => {
        resetForm();
        onClose();
    }

    const save = async () => {
        setLoading(true);

        try {
            if (!user) throw new Error("User error");

            const newPost = {
                title: input,
                content: textarea,
                private: false,
                author: user.id,
            };

            const res = await fetch("http://localhost:3000/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`,
                },
                body: JSON.stringify(newPost),
            });

            if (!res.ok) throw new Error("Erreur lors de l’ajout du post");

            resetForm();
            onClose();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

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
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                />
                                <Textarea
                                    id="content"
                                    label="Content"
                                    placeholder="Content"
                                    value={textarea}
                                    onChange={(e) => setTextarea(e.target.value)}
                                />
                                <div className={style.modalCta}>
                                    <Button type="button" variant="buttonBlack" action={close} size="m">Cancel</Button>
                                    <Button type="button" variant="button" action={save} size="m">Save</Button>
                                </div>
                            </>
                    :
                    <p>Please login</p>
                }
            </div>
        </div>
    )
}
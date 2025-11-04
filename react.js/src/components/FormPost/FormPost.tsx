import { useState } from "react";

import type { PostFormModalInterface } from "./FormPost.interface";

import style from "./FormPost.module.scss";

import Button from "../Button/Button";
import Input from "../Input/Input";
import Textarea from "../Textarea/Textarea";

export default function FormPost({ post, onClose }: PostFormModalInterface) {
    const [input, setInput] = useState(post?.title ?? "");
    const [textarea, setTextarea] = useState(post?.content ?? "");

    const resetForm = () => {
        setInput("")
        setTextarea("")
    }

    const close = () => {
        resetForm();
        onClose();
    }

    const save = () => {
        resetForm();
    }

    return (
        <div className={style.root}>
            <span className={style.blurredBg}></span>

            <div className={style.modal}>
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
            </div>
        </div>
    )
}
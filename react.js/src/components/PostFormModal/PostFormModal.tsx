import { useState } from "react";

import type { PostFormModalInterface } from "./PostFormModal.interface";

import Button from "../Button/Button";

import style from "./PostFormModal.module.scss";

export default function PostFormModal({ post, onClose }: PostFormModalInterface) {
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
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="content">Content</label>
                    <textarea
                        id="content"
                        value={textarea}
                        onChange={(e) => setTextarea(e.target.value)}
                    ></textarea>
                </div>
                <div className={style.modalCta}>
                    <Button type="button" variant="buttonBlack" action={close} size="m">Cancel</Button>
                    <Button type="button" variant="button" action={save} size="m">Save</Button>
                </div>
            </div>
        </div>
    )
}
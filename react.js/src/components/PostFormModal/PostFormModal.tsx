import { useState } from "react";

import type { PostFormModalInterface } from "./PostFormModal.interface";
import Button from "../Button/Button";

export default function PostFormModal({ post, onClose }: PostFormModalInterface) {
    const [input, setInput] = useState(post?.title ?? "");
    const [textarea, setTextarea] = useState(post?.content ?? "");

    return (
        <div>
            <Button type="button" variant="button" action={onClose}>X</Button>
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
        </div>
    )
}
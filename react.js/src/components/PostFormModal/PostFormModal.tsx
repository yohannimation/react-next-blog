import { useState } from "react";

import type { PostFormModalInterface } from "./PostFormModal.interface";

export default function PostFormModal({ title, content, onClose }: PostFormModalInterface) {
    const [input, setInput] = useState(title ?? "");
    const [textarea, setTextarea] = useState(content ?? "");

    return (
        <div>
            <button type="button" onClick={onClose}>X</button>
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
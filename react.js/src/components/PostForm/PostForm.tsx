import { useState } from "react";

import type { PostFormInterface } from "./PostForm.interface";

export default function PostForm({ title, content }: PostFormInterface) {
    const [input, setInput] = useState(title ?? "");
    const [textarea, setTextarea] = useState(content ?? "");

    return (
        <div>
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
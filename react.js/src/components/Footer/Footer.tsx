import { useState } from "react"

import PostFormModal from "../PostFormModal/PostFormModal"

export default function Footer() {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <footer>
            { isOpen && <div onClick={() => setIsOpen(false)}><PostFormModal onClose={() => setIsOpen(false)} /></div> }
            <button type="button" onClick={() => setIsOpen(true)}>Add a post</button>
        </footer>
    )
}
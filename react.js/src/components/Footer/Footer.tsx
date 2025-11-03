import { useState } from "react"

import style from "./Footer.module.scss"

import PostFormModal from "../PostFormModal/PostFormModal"
import Button from "../Button/Button"

export default function Footer() {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <footer className={style.footer}>
            { isOpen && <div onClick={() => setIsOpen(false)}><PostFormModal onClose={() => setIsOpen(false)} /></div> }
            <Button type="button" variant="button" action={() => setIsOpen(true)}>Add a post</Button>
        </footer>
    )
}
import { useState } from "react"

import style from "./Footer.module.scss"

import FormPost from "../FormPost/FormPost"
import Button from "../Button/Button"

export default function Footer() {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <footer className={style.footer}>
            { isOpen && <FormPost onClose={() => setIsOpen(false)} /> }
            <Button type="button" variant="button" action={() => setIsOpen(true)} size="l">Add a post</Button>
        </footer>
    )
}
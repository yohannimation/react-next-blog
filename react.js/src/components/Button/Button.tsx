import { Link } from "react-router-dom";

import type { ButtonInterface } from "./Button.interface";

import style from "./Button.module.scss"

export default function Button(props: ButtonInterface) {
    const {children, type, variant} = props
    
    switch (type) {
        case 'button':
            return <button type="button" className={style[variant]} onClick={props.action}>
                {children}
            </button>

        case 'link':
            return <Link to={props.href} className={style[variant]}>{children}</Link>
        
        default:
            return <p>type error</p>
    }
}
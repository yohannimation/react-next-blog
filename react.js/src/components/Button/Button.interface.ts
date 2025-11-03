import { ReactNode } from "react";

export type ButtonInterface = 
    | (ButtonBaseInterface & { type: "button"; action: () => void; size: 's' | 'm' | 'l' })
    | (ButtonBaseInterface & { type: "link"; href: string })

interface ButtonBaseInterface {
    children: ReactNode
    variant: 'link' | 'button' | 'buttonBlack'
}
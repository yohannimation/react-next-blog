import { ChangeEvent } from "react";

export interface InputInterface {
    id?: string;
    label?: string;
    type?: "text" | "email" | "password" | "number" | "search";
    placeholder?: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
}

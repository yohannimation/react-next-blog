import { ChangeEvent } from "react";

export interface TextareaInterface {
    id?: string;
    label?: string;
    placeholder?: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    disabled?: boolean;
    rows?: number;
}

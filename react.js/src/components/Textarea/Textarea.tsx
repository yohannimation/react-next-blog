import type { TextareaInterface } from "./Textarea.interface";
import styles from "./Textarea.module.scss";

export default function Textarea({
    id,
    label,
    placeholder,
    value,
    onChange,
    disabled = false,
    rows = 4,
}: TextareaInterface) {
    return (
        <div className={styles.textareaContainer}>
        {label && <label htmlFor={id}>{label}</label>}
        <textarea
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            rows={rows}
            className={styles.textarea}
        />
        </div>
    );
}

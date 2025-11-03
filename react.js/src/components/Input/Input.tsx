import type { InputInterface } from "./Input.interface";
import styles from "./Input.module.scss";

export default function Input({
    id,
    label,
    type = "text",
    placeholder,
    value,
    onChange,
    disabled = false,
}: InputInterface) {
    return (
        <div className={styles.inputContainer}>
            {label && <label htmlFor={id}>{label}</label>}
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={styles.input}
            />
        </div>
    );
}

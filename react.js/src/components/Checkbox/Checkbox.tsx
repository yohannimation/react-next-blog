import type { CheckboxInterface } from "./Checkbox.interface";
import styles from "./Checkbox.module.scss";

export default function Checkbox({
    id,
    label,
    checked,
    onChange,
    disabled = false,
}: CheckboxInterface) {
    return (
        <div className={styles.checkboxContainer}>
            <input
                id={id}
                type="checkbox"
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                className={styles.checkbox}
            />
            {label && (
                <label htmlFor={id} className={styles.label}>
                    {label}
                </label>
            )}
        </div>
    );
}

import React from "react";
import { FieldError, Input, Label, TextField } from "react-aria-components";
import styles from "./AriaTextField.module.scss";

interface AriaTextFieldProps {
  errorMessage?: string;
  value: string;
  label: string;
  type?: string;
  className?: string;
  setValue: (value: string) => void;
}

const AriaTextField: React.FC<AriaTextFieldProps> = ({
  errorMessage,
  value,
  setValue,
  label,
  type,
  className,
  ...props
}) => {
  const _className = className
    ? className + " " + styles.inputWrapper
    : styles.inputWrapper;
  return (
    <>
      <TextField
        className={_className}
        isInvalid={!!errorMessage}
        onChange={setValue}
        {...props}
      >
        <Label className={styles.label}>{label}</Label>
        <Input className={styles.input} type={type} value={value}></Input>
        <FieldError className={styles.error}>{errorMessage}</FieldError>
      </TextField>
    </>
  );
};

export default AriaTextField;

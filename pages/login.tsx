import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import {
  Button,
  FieldError,
  Input,
  Label,
  TextField,
} from "react-aria-components";
import styles from "./Login.module.scss";
import AriaTextField from "../components/AriaTextField/AriaTextField";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Layout>
      <div className={styles.pageContainer}>
        <h1>Anmelden</h1>
        <AriaTextField
          errorMessage={errorMessage}
          value={password}
          setValue={setPassword}
          label="Passwort"
          type="password"
        ></AriaTextField>
        <Button
          className={styles.button}
          onPress={() => {
            setErrorMessage("Passwort nicht gültig");
          }}
        >
          Anmelden
        </Button>
      </div>
    </Layout>
  );
};

export default Login;

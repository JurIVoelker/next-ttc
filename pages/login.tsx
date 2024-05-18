import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { Button } from "react-aria-components";
import styles from "./Login.module.scss";
import AriaTextField from "../components/AriaTextField/AriaTextField";
import { auth } from "../utils/strapi";
import { PulseLoader } from "react-spinners";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [isSending, setSending] = useState(false);

  const handleLogin = () => {
    auth(password)
      .then((res) => {
        if (!res) {
          setErrorMessage("Passwort nicht gültig");
          setSending(false);
        } else {
          setErrorMessage("");
          setToken(true);
          setSending(false);
        }
      })
      .catch((e) => {
        setErrorMessage(e?.message);
      });
  };

  const [isToken, setToken] = useState(false);

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const token = localStorage.getItem("jwt");
      if (token) {
        setToken(true);
      }
    } else {
      setToken(false);
    }
  }, []);

  return (
    <Layout>
      <div className={styles.pageContainer}>
        {!isToken && (
          <>
            <h1>Einloggen</h1>
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
                setSending(true);
                handleLogin();
              }}
              isDisabled={isSending}
            >
              {!isSending && "Einloggen"}
              {isSending && <PulseLoader color="white" />}
            </Button>
          </>
        )}
        {isToken && (
          <>
            <h1>Ausloggen</h1>
            <p>Du bist angemeldet. Möchtest du dich abmelden?</p>
            <Button
              className={styles.button}
              onPress={() => {
                localStorage.removeItem("jwt");
                setToken(false);
              }}
            >
              Ausloggen
            </Button>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Login;

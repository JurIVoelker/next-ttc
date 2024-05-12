import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import {
  DatePicker,
  FieldError,
  Input,
  Label,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  TextField,
} from "react-aria-components";
import styles from "./neuer-artikel.module.scss";
import AriaTextField from "../../components/AriaTextField/AriaTextField";
import AriaDatePicker from "../../components/AriaDatePicker/AriaDatePicker";

import RichTextArea from "../../components/RichTextArea/RichTextArea";

const NewPage = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  return (
    <Layout>
      <Tabs>
        <TabList aria-label="Inhalt tabs" className={styles.tabList}>
          <Tab id="text" className={styles.tabSection}>
            Text
          </Tab>
          <Tab id="images" className={styles.tabSection}>
            Bilder
          </Tab>
          <Tab id="preview" className={styles.tabSection}>
            Vorschau
          </Tab>
        </TabList>

        <TabPanel id="text">
          <AriaTextField
            value={title}
            setValue={setTitle}
            label="Titel"
          ></AriaTextField>
          <AriaDatePicker />
          <RichTextArea></RichTextArea>
        </TabPanel>
        <TabPanel id="images">Senatus Populusque Romanus.</TabPanel>
        <TabPanel id="preview">Alea jacta est.</TabPanel>
      </Tabs>
    </Layout>
  );
};

export default NewPage;

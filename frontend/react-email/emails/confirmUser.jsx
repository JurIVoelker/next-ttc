import {
  Body,
  Column,
  Container,
  Head,
  Html,
  Preview,
  Row,
  Section,
} from "@react-email/components";
import * as React from "react";
import { EmailText } from "../components/EmailText";
import { EmailH1 } from "../components/EmailH1";
import { EmailButton } from "../components/EmailButton";

export const ConfirmUserEmail = ({ firstName, lastName, email, magicLink }) => (
  <Html>
    <Head />
    <Preview>{`Freischaltungsanfrage von ${firstName}`}</Preview>
    <Body>
      <Section style={{ backgroundColor: "#5e7bad" }}>
        <Container style={{ padding: "1em" }}>
          <EmailH1 style={{ color: "white" }}>
            Neuen Nutzer freischalten
          </EmailH1>
          <EmailText style={{ color: "white" }}>
            {firstName} möchte freigeschaltet werden
          </EmailText>
        </Container>
      </Section>
      <Container style={{ padding: "1em" }}>
        <Container
          style={{
            padding: "1em 1.5em",
            backgroundColor: "rgba(94, 123, 173, 0.3)",
            margin: "2em 0",
            borderRadius: "0.5em",
          }}
        >
          <EmailText style={{ fontWeight: "600" }}>
            Informationen zum Nutzer
          </EmailText>
          <EmailText style={{ marginTop: "0.75em" }}>
            Vorname: {firstName}
          </EmailText>
          <EmailText>Nachname: {lastName}</EmailText>
          <EmailText>E-Mail-Adresse: {email}</EmailText>
        </Container>
        <Row>
          <Column align="center">
            <EmailButton href={magicLink}>Nutzer freischalten</EmailButton>
          </Column>
        </Row>
      </Container>
    </Body>
  </Html>
);

export default ConfirmUserEmail;

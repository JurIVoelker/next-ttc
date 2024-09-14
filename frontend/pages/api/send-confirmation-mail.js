import { Resend } from "resend";
import { render } from "@react-email/components";
import Email from "../../react-email/emails/confirmUser";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST")
      return res.status(404).json({ message: "not found" });

    const key = process.env.RESEND_API_KEY;
    const from = process.env.MAIL_FROM;
    const to = process.env.MAIL_TO;

    if (!key) return res.status(500).json({ message: "missing api key" });
    if (!from) return res.status(500).json({ message: "missing from email" });
    if (!to) return res.status(500).json({ message: "missing to email" });

    const { firstName, lastName, magicLink, email } = req.body;

    if (!firstName)
      return res.status(400).json({ message: "firstName is a required field" });
    if (!lastName)
      return res.status(400).json({ message: "lastName is a required field" });
    if (!magicLink)
      return res.status(400).json({ message: "magicLink is a required field" });
    if (!email)
      return res.status(400).json({ message: "email is a required field" });

    const resend = new Resend(key);
    const emailHtml = render(<Email {...req.body} />);

    await resend.emails.send({
      from,
      to,
      subject: "Neuen Nutzer freischalten",
      html: emailHtml,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error" });
  }
  res.status(200).json({ message: "mail was successfully sent" });
}

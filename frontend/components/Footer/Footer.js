import Link from "next/link";
import styles from "./Footer.module.scss";

function Footer({ global }) {
  const { joolaLogoURL, ttcKlingenmuensterLogoURL } = global;
  return (
    <div className={styles.footer}>
      <div className={styles.logos}>
        <img src={ttcKlingenmuensterLogoURL} width={500} height={130} />
        <img src={joolaLogoURL} width={500} height={130} />
      </div>
      <Link href={"/login"}>© 2023 TTC Klingenmünster </Link>
    </div>
  );
}

export default Footer;

import Link from "next/link";
import styles from "./Footer.module.scss";

function Footer() {
  return (
    <div className={styles.footer}>
      <Link href={"/login"}>Login</Link>
    </div>
  );
}

export default Footer;

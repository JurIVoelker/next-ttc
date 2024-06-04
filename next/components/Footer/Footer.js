import Link from "next/link";
import styles from "./Footer.module.scss";
import Image from "next/image";

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.logos}>
        <Image
          src={"http://127.0.0.1:1337/uploads/logo_ttc_farbig_ac89ff5756.png"}
          width={500}
          height={130}
        />
        <Image
          src={"http://127.0.0.1:1337/uploads/logo_joola_20aaf9f6f4.png"}
          width={500}
          height={130}
        />
      </div>
      <Link href={"/login"}>© 2023 TTC Klingenmünster </Link>
    </div>
  );
}

export default Footer;

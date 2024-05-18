import Link from "next/link";
import styles from "./NavBar.module.scss";

const NavBar = () => {
  return (
    <div className={styles.navContainer}>
      <Link href={"/"} className={styles.link}>
        Start
      </Link>
      <Link href={"/"} className={styles.link}>
        Verein
      </Link>
      <Link href={"/"} className={styles.link}>
        Erwachsene
      </Link>
      <Link href={"/"} className={styles.link}>
        Jugend
      </Link>
      <Link href={"/"} className={styles.link}>
        Galerie
      </Link>
      <Link href={"/aktuelles"} className={styles.link}>
        Aktuelles
      </Link>
      <Link href={"/"} className={styles.link}>
        Verein
      </Link>
      <Link href={"/"} className={styles.link}>
        Anderes
      </Link>
    </div>
  );
};

export default NavBar;

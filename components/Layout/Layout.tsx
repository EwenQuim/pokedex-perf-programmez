import Link from "next/link";
import Image from "next/image";
import styles from "./Layout.module.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className={styles.main}>
      <div className={styles.logoContainer}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/pokeball.png"
            alt="pokedex logo"
            width={100}
            height={100}
          />{" "}
          Pokedex
        </Link>
      </div>
      <div className={styles.heroImageContainer}>
        <Image
          src="/pokemon-hero-image-alt.png"
          alt=""
          width={1920}
          height={1080}
          className={styles.heroBanner}
        />
      </div>
      <div className={styles.content}>{children}</div>
    </main>
  );
}

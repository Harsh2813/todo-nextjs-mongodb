import React from "react";
import Link from "next/link";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <>
      <nav className={styles.headerNav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link href="/" className={styles.navLink}>
              ToDo
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/todos" className={styles.navLink}>
              Completed To Do
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;

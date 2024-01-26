import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <Link to="/">
      <img
        src="../../img/IconLogo.svg"
        alt="NestSaver logo icon"
        className={styles.logoIcon}
      />
      <img
        src="../../img/LandingLogo.svg"
        alt="NestSaver logo"
        className={styles.logoFull}
      />
    </Link>
  );
}

export default Logo;

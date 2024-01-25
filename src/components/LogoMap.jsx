import { Link } from "react-router-dom";
import styles from "./LogoMap.module.css";

function LogoMap() {
  return (
    <div className={styles.logoMap}>
      <Link to="/">
        <img
          src="../../public/img/MapLogo.svg"
          alt="NestSaver Logo"
          className={styles.logoHome}
        />
      </Link>
    </div>
  );
}

export default LogoMap;

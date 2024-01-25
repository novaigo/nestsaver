import Sidebar from "../components/Sidebar";
import Map from "../components/Map";
import LogoMap from "../components/LogoMap";

import styles from "./AppLayout.module.css";

function AppLayout() {
  return (
    <div className={styles.appContainer}>
      <div className={styles.app}>
        <Sidebar />
        <Map />
        <LogoMap size="small" />
      </div>
    </div>
  );
}

export default AppLayout;

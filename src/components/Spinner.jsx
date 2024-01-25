import styles from "./Spinner.module.css";

function Spinner() {
  return (
    <div className={styles.spinner}>
      <div className={styles.spinnerInner}></div>
    </div>
  );
}

export default Spinner;

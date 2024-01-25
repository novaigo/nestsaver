import styles from "./WelcomeMessage.module.css";

function WelcomeMessage({ message }) {
  return <p className={styles.message}>{message}</p>;
}

export default WelcomeMessage;

import PageNav from "../components/PageNav";
import styles from "./PageNotFound.module.css";

export default function PageNotFound() {
  return (
    <main>
      <PageNav />
      <section className={styles.pageNotFound}>
        <h1>Page Not Found</h1>
        <p className={styles.description}>
          Oops! The page you're looking for seems to have relocated. Our
          apologies for the inconvenience. Navigate back to safety or explore
          other NestSave features. <br />
          Happy nesting!
        </p>
      </section>
    </main>
  );
}

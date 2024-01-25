import styles from "./Homepage.module.css";
import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";

function Homepage() {
  return (
    <main className={styles.main}>
      <PageNav />
      <section className={styles.landing}>
        <section className={styles.homepage}>
          <h1>Seize the Moment</h1>
          <h1>Nest the Memory</h1>
          <p className={styles.description}>
            Elevate your apartment search with NestSaver. Click below to
            effortlessly capture and compare the details of viewed apartments,
            simplifying your decision-making process.
          </p>
          <Link to="/app" className="cta">
            NEST NOW
          </Link>
        </section>
        <img
          className={styles.landingImage}
          src="../../public/img/NestSaver-Landing.png"
        ></img>
      </section>
    </main>
  );
}

export default Homepage;

import PageNav from "../components/PageNav";
import style from "./About.module.css";

function About() {
  return (
    <main>
      <PageNav />

      <section className={style.about}>
        <div>
          <h1>About us</h1>
          <p className={style.description}>
            Welcome to NestSaver, where we believe in making your apartment
            search an enjoyable and memorable experience. Finding the perfect
            nest is not just about the place; it's about capturing the moments
            that turn a space into a home.
          </p>
          <p className={style.personal}>
            Developed for a personal portfolio project.
          </p>
          <p>
            © Copyright by{" "}
            <a
              href="https://github.com/novaigo"
              target="_blank"
              rel="noreferrer"
            >
              Igor Novakovic
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}

export default About;

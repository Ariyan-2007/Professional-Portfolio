import Image from "next/image";
import projects from "../data/projects.json";

export default function Projects() {
  return (
    <section id="projects">
      <div className="container">
        <p className="eyebrow">Selected Builds</p>
        <h2 className="section-title">Projects</h2>
        <p className="section-sub">
          Things I&rsquo;ve designed and shipped, from idea to production.
        </p>

        <div className="projects-grid">
          {projects.map((project) => {
            const content = (
              <div className="project-card__body">
                <div className="project-card__logo">
                  <Image
                    src={project.preview}
                    alt={project.title}
                    fill
                    sizes="64px"
                    className="project-card__image"
                  />
                </div>

                <div className="project-card__details">
                  <h3 className="project-card__title">{project.title}</h3>

                  <div className="project-card__row">
                    <span className="project-card__label">Problem</span>
                    <p className="project-card__text">{project.problem}</p>
                  </div>

                  <div className="project-card__row">
                    <span className="project-card__label">Solution</span>
                    <p className="project-card__text">{project.solution}</p>
                  </div>
                </div>
              </div>
            );

            return project.link ? (
              <a
                key={project.title}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card project-card--link"
              >
                {content}
              </a>
            ) : (
              <div className="project-card" key={project.title}>
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

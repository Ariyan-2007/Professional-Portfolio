"use client";

import { useState } from "react";
import projects from "../data/projects.json";
import MediaImage from "./MediaImage";

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = projects[activeIndex];

  return (
    <section id="projects">
      <div className="container">
        <p className="eyebrow">Selected Builds</p>
        <h2 className="section-title">Projects</h2>
        <p className="section-sub">
          Things I&rsquo;ve designed and shipped, from idea to production.
        </p>

        <div className="projects-layout">
          <div className="projects-rail" role="tablist" aria-label="Projects">
            {projects.map((project, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={project.title}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={project.title}
                  className={`projects-rail__item${
                    isActive ? " projects-rail__item--active" : ""
                  }`}
                  onClick={() => setActiveIndex(index)}
                >
                  <span className="projects-rail__logo">
                    <MediaImage
                      src={project.preview}
                      alt=""
                      fill
                      sizes="64px"
                      className="projects-rail__image"
                    />
                  </span>
                </button>
              );
            })}
          </div>

          <div className="project-detail" key={active.title}>
            <div className="project-detail__header">
              <span className="project-detail__logo">
                <MediaImage
                  src={active.preview}
                  alt={active.title}
                  fill
                  sizes="48px"
                  className="project-detail__image"
                />
              </span>
              <h3 className="project-detail__title">{active.title}</h3>
            </div>

            <div className="project-detail__row">
              <span className="project-card__label">Problem</span>
              <p className="project-card__text">{active.problem}</p>
            </div>

            <div className="project-detail__row">
              <span className="project-card__label">Solution</span>
              <p className="project-card__text">{active.solution}</p>
            </div>

            {active.link && (
              <a
                href={active.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-detail__link"
              >
                View project ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

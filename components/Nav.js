"use client";

import { useEffect, useState } from "react";
import VisitCounter from "./VisitCounter";

const LINKS = [
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#projects", label: "Projects" },
  { href: "#publications", label: "Publications" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className="nav">
      <div className="container nav__row">
        <a href="#top" className="nav__mark">
          <span className="nav__mark-code" aria-hidden="true">AJ</span>
          Ariyan Jahangir
        </a>

        <ul className="nav__links">
          {LINKS.filter((l) => l.href !== "#contact").map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>

        <div className="nav__utility">
          <VisitCounter />
          <a href="#contact" className="nav__cta">Get in touch</a>
        </div>

        <button
          type="button"
          className="nav__burger"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="nav-panel"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      <div
        id="nav-panel"
        className={`nav__panel${menuOpen ? " nav__panel--open" : ""}`}
      >
        <div className="nav__panel-links">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={
                link.href === "#contact"
                  ? "nav__panel-link nav__panel-link--cta"
                  : "nav__panel-link"
              }
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="nav__panel-footer">
          <VisitCounter compact />
        </div>
      </div>
    </header>
  );
}
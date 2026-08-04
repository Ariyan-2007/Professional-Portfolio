"use client";

import VisitCounter from "./VisitCounter";

const LINKS = [
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#publications", label: "Publications" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="nav">
      <div className="container nav__row">
        <a href="#top" className="nav__mark">
          <span className="nav__mark-code" aria-hidden="true">AJ</span>
          Ariyan Jahangir
        </a>

        <ul className="nav__links">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>

        <div className="nav__utility">
          <VisitCounter />
          <a href="#contact" className="nav__cta">Get in touch</a>
        </div>
      </div>
    </header>
  );
}
import education from "../data/education.json";
import awards from "../data/awards.json";
import { formatMonth, formatFullDate } from "../lib/dates";

export default function EducationAwards() {
  return (
    <section id="education">
      <div className="container">
        <p className="eyebrow">Education &amp; Awards</p>
        <h2 className="section-title">Credentials</h2>
        <p className="section-sub">Degree and recognitions earned along the way.</p>

        <div className="stub-grid">
          {education.map((ed) => (
            <div className="stub" key={ed.degree}>
              <div className="stub__eyebrow">Education</div>
              <h3 className="stub__title">{ed.degree}</h3>
              <div className="stub__meta">
                {ed.institution} · {formatMonth(ed.start)} – {formatMonth(ed.end)}
              </div>
            </div>
          ))}

          {awards.map((award) => (
            <div className="stub" key={award.title}>
              <div className="stub__eyebrow">Award · {formatFullDate(award.date)}</div>
              <h3 className="stub__title">{award.title}</h3>
              <div className="stub__meta">{award.issuer}</div>
              <p className="stub__desc">{award.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

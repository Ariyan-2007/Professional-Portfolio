import profile from "../data/profile.json";
import references from "../data/references.json";

export default function Contact() {
  const year = new Date().getFullYear();

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="contact__grid">
          <div>
            <p className="eyebrow">Contact</p>
            <h2 className="contact__name">Let&rsquo;s talk</h2>
            <p className="contact__line">
              <a href={`mailto:${profile.email}`} className="contact__row">
                <span className="contact__row-text">{profile.email}</span>
                <span className="contact__row-icon" aria-hidden="true">✉</span>
              </a>
            </p>
            <p className="contact__line">
              <a href={`tel:${profile.phone}`} className="contact__row">
                <span className="contact__row-text">{profile.phone}</span>
                <span className="contact__row-icon" aria-hidden="true">☎</span>
              </a>
            </p>
            <p className="contact__line">{profile.location}</p>
            <p className="contact__line contact__social">
              {profile.links.map((link, i) => (
                <span className="contact__social-item" key={link.label}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact__social-link"
                  >
                    {link.label}
                  </a>
                  {i < profile.links.length - 1 && (
                    <span className="contact__sep" aria-hidden="true">  ·  </span>
                  )}
                </span>
              ))}
            </p>
          </div>

          <div>
            <p className="contact__refs-title">References</p>
            {references.map((ref) => (
              <div className="contact__ref" key={ref.name}>
                <div className="contact__ref-name">{ref.name}</div>
                <div className="contact__ref-title">{ref.title}</div>
                <div className="contact__ref-note">{ref.contactNote}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="contact__bottom">
          <span>© {year} {profile.name}</span>
          {/* <span>Built with Next.js</span> */}
        </div>
      </div>
    </section>
  );
}

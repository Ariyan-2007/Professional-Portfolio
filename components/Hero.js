import profile from "../data/profile.json";
import experience from "../data/experience.json";
import education from "../data/education.json";
import Image from "next/image";

export default function Hero() {
  const current = experience.find((e) => e.status === "current") ?? experience[0];
  const origin = education[0];

  return (
    <section className="hero" id="top">
      <div className="container">
        <div className="pass">
          <div className="pass__main">
            <div className="pass__top">
              <div>
                <div className="pass__eyebrow">Software Engineer · Aspiring Researcher</div>
              </div>
              <div className="pass__pnr">
                Record locator
                <strong>{profile.pnrCode}</strong>
              </div>
            </div>

            <h1 className="pass__name">{profile.name}</h1>
            <span className="pass__role">{profile.roleLine}</span>

            <p className="pass__summary">{profile.summary}</p>

            <div className="pass__quick-proof" aria-label="Core capabilities">
              <span>ASP.NET Core</span>
              <span>C#</span>
              <span>Airline APIs</span>
              <span>Payment Gateway</span>
            </div>

            <div className="pass__route">
              <div className="pass__waypoint pass__waypoint--from">
                <span className="pass__field-label">Origin</span>
                <strong>{origin.shortName ?? origin.institution}</strong>
              </div>
              <div className="pass__route-line" aria-hidden="true" />
              <div className="pass__waypoint pass__waypoint--to">
                <span className="pass__field-label">Current Role</span>
                <strong>{current.role}</strong>
              </div>
            </div>

            <div className="pass__actions">
              <a className="btn btn--primary" href={`mailto:${profile.email}`}>
                Email Me
              </a>
              <a className="btn btn--ghost" href={profile.resumeFile} download>
                Download Resume
              </a>
            </div>
          </div>

          <div className="pass__stub">
            <span className="pass__perf" aria-hidden="true" />
            {/*
              PHOTO PLACEHOLDER
              To add a real photo: drop an image at /public/images/profile.jpg
              and replace this div with:
                <Image src="/images/profile.jpg" alt={profile.name} width={400} height={533} style={{borderRadius: 10}} />
              (import Image from "next/image" at the top of this file)
            */}
            <div className="pass__photo">
              <Image
                src="/images/profile.jpg"
                alt={profile.name}
                width={300}
                height={400}
                className="pass__photo-image"
                loading="eager"
              />
            </div>



            <div className="pass__seat">
              <div className="pass__seat-row">
                <span>Based in</span>
                <span>{profile.location}</span>
              </div>
              <div className="pass__seat-row">
                <span>Contact</span>
                <span>{profile.phone}</span>
              </div>
            </div>

            <div className="pass__barcode" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}

import profile from "../data/profile.json";

/* Fixed bottom action bar, mobile only (see .mobile-cta in globals.css).
   Keeps Email/Resume reachable without scrolling back to the hero. */
export default function MobileCTA() {
  return (
    <div className="mobile-cta" aria-label="Quick actions">
      <a className="mobile-cta__btn mobile-cta__btn--primary" href={`mailto:${profile.email}`}>
        Email me
      </a>
      <a className="mobile-cta__btn mobile-cta__btn--ghost" href={profile.resumeFile} download>
        Resume
      </a>
    </div>
  );
}

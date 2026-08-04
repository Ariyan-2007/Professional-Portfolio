import experience from "../data/experience.json";
import { formatMonth } from "../lib/dates";

/* Pilot-stripe rank insignia — fills bars left-to-right by seniority. */
function RankStripes({ count, total = 3 }) {
  return (
    <span className="rank" aria-hidden="true">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`rank__bar ${i < count ? "rank__bar--filled" : ""}`}
        />
      ))}
    </span>
  );
}

function StandardRow({ job }) {
  const isCurrent = job.status === "current";

  return (
    <li className={`board__row ${isCurrent ? "board__row--current" : "board__row--past"}`}>
      <span className="board__code">{job.code}</span>

      <div className="board__summary">
        <h3 className="board__role">{job.role}</h3>
      </div>

      <p className="board__org">{job.org}</p>

      <span className="board__location">{job.location}</span>

      <span className="board__dates">
        {formatMonth(job.start)} – {formatMonth(job.end)}
      </span>

      <span className="board__status">
        <span className="board__dot" aria-hidden="true" />
        {isCurrent ? "Active" : "Former Employee"}
      </span>

      <ul className="board__bullets">
        {job.bullets.map((bullet, index) => (
          <li key={index}>{bullet}</li>
        ))}
      </ul>
    </li>
  );
}

/* A job with an internal promotion: one flight code, one continuous
   journey, rendered as a climbing flight-log instead of a flat bullet list. */
function PromotionRow({ job }) {
  const isCurrent = job.status === "current";
  const positions = job.positions;
  const latest = positions[0];
  const maxRank = Math.max(...positions.map((p) => p.rank));

  return (
    <li
      className={`board__row board__row--promo ${isCurrent ? "board__row--current" : "board__row--past"}`}
    >
      <span className="board__code board__code--promo">
        {job.code}
        <span className="board__code-tag" title="Internal promotion, same employer">
          ▲
        </span>
      </span>

      <div className="board__summary">
        <h3 className="board__role">{latest.role}</h3>
      </div>

      <p className="board__org">{job.org}</p>

      <span className="board__location">{job.location}</span>

      <span className="board__dates">
        {formatMonth(job.start)} – {formatMonth(job.end)}
      </span>

      <span className="board__status">
        <span className="board__dot" aria-hidden="true" />
        {isCurrent ? "Active" : "Former Employee"}
      </span>

      <div
        className="flightlog"
        role="list"
        aria-label={`Rank progression at ${job.org}`}
      >
        {positions.map((pos, i) => {
          const isLast = i === positions.length - 1;
          const isFirst = i === 0;
          const legIsCurrent = isCurrent && isFirst;

          return (
            <div className="flightlog__leg" role="listitem" key={pos.role}>
              <div className="flightlog__track" aria-hidden="true">
                <span
                  className={`flightlog__node ${legIsCurrent ? "flightlog__node--active" : "flightlog__node--done"}`}
                />
                {!isLast && <span className="flightlog__line" />}
              </div>

              <div className="flightlog__content">
                <div className="flightlog__head">
                  <RankStripes count={pos.rank} total={maxRank} />
                  <h4 className="flightlog__role">{pos.role}</h4>
                  {legIsCurrent && <span className="flightlog__current">Current</span>}
                </div>

                <p className="flightlog__dates">
                  {formatMonth(pos.start)} – {formatMonth(pos.end)}
                </p>

                <ul className="board__bullets flightlog__bullets">
                  {pos.bullets.map((bullet, index) => (
                    <li key={index}>{bullet}</li>
                  ))}
                </ul>

                {!isLast && (
                  <span className="flightlog__milestone">
                    <span className="flightlog__milestone-icon">▲</span>
                    Promoted
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </li>
  );
}

export default function CareerLog() {
  return (
    <section id="experience">
      <div className="container">
        <p className="eyebrow">Departures · Career Log</p>
        <h2 className="section-title">Experience</h2>
        <p className="section-sub">
          A chronological log of where I&rsquo;ve worked, most recent first.
        </p>

        <div className="board__head" aria-hidden="true">
          <span>Code</span>
          <span>Role</span>
          <span>Location</span>
          <span>Dates</span>
          <span>Status</span>
        </div>

        <ul className="board__list">
          {experience.map((job) =>
            job.positions ? (
              <PromotionRow key={job.code} job={job} />
            ) : (
              <StandardRow key={job.code} job={job} />
            )
          )}
        </ul>
      </div>
    </section>
  );
}
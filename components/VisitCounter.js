"use client";

import { useEffect, useState } from "react";

// Module-level cache so mounting the badge in more than one place (e.g. the
// desktop nav bar and the mobile menu panel) still records exactly one visit.
let visitPromise = null;

function recordVisitOnce() {
  if (!visitPromise) {
    visitPromise = fetch("/api/visit", { method: "POST", cache: "no-store" })
      .then((response) => response.json())
      .then((data) => (Number.isFinite(data?.count) ? data.count : 0))
      .catch(() => 0);
  }
  return visitPromise;
}

export default function VisitCounter({ compact = false }) {
  const [visitCount, setVisitCount] = useState(null);

  useEffect(() => {
    let isMounted = true;
    recordVisitOnce().then((count) => {
      if (isMounted) setVisitCount(count);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const value = visitCount === null ? "--" : visitCount.toLocaleString();

  if (compact) {
    return (
      <>
        <span className="nav__panel-visits-label">Unique visits</span>
        <span className="nav__panel-visits-value">{value}</span>
      </>
    );
  }

  return (
    <div className="nav__flight" aria-label="Unique site visits badge">
      <span className="nav__flight-label">Unique visits</span>
      <span className="nav__flight-value">{value}</span>
    </div>
  );
}
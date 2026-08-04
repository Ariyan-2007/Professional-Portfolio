"use client";

import { useEffect, useState } from "react";

export default function VisitCounter() {
  const [visitCount, setVisitCount] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function recordVisit() {
      try {
        const response = await fetch("/api/visit", {
          method: "POST",
          cache: "no-store",
        });
        const data = await response.json();
        if (isMounted) {
          setVisitCount(Number.isFinite(data?.count) ? data.count : 0);
        }
      } catch {
        if (isMounted) {
          setVisitCount(0);
        }
      }
    }

    recordVisit();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="nav__flight" aria-label="Unique site visits badge">
      <span className="nav__flight-label">Unique visits</span>
      <span className="nav__flight-value">
        {visitCount === null ? "--" : visitCount.toLocaleString()}
      </span>
    </div>
  );
}
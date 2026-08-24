"use client";

import { useEffect, useState } from "react";
import { resolveMediaUrl, localMediaUrl } from "../lib/media";

// A stalled/unreachable host never rejects the fetch on its own — this
// caps how long the HEAD check waits before we treat the CDN as down.
const CDN_TIMEOUT_MS = 4000;

// Drop-in replacement for <a href> that points at the CDN copy of a file
// (e.g. the resume PDF) and falls back to the local /public copy if the
// CDN looks unreachable. Uses mode: "no-cors" deliberately — a HEAD check
// in normal cors mode throws on a plain public bucket with no CORS policy
// (R2's default), which would false-positive every request as "failed"
// even when the file is there. no-cors still rejects on a real outage
// (DNS failure, connection refused, our own timeout abort); it just can't
// see the status code, so it can't distinguish "up" from "file missing".
export default function MediaLink({ href, children, ...props }) {
  const fallbackHref = localMediaUrl(href);
  const [resolvedHref, setResolvedHref] = useState(() => resolveMediaUrl(href));

  useEffect(() => {
    if (resolvedHref === fallbackHref) return undefined;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), CDN_TIMEOUT_MS);

    fetch(resolvedHref, { method: "HEAD", mode: "no-cors", signal: controller.signal })
      .catch(() => setResolvedHref(fallbackHref))
      .finally(() => clearTimeout(timer));

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <a href={resolvedHref} {...props}>
      {children}
    </a>
  );
}

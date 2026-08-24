"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { resolveMediaUrl, localMediaUrl } from "../lib/media";

// A stalled/unreachable host (e.g. DNS resolves but nothing answers) never
// fires the <img> error event on its own — this timeout is what makes that
// case fall back too, not just a fast 404/connection-refused.
const CDN_TIMEOUT_MS = 4000;

// Drop-in replacement for next/image that resolves `src` through the CDN
// and silently swaps to the local /public copy if the CDN request fails
// or doesn't finish loading within CDN_TIMEOUT_MS.
export default function MediaImage({ src, ...props }) {
  const fallbackSrc = localMediaUrl(src);
  const [currentSrc, setCurrentSrc] = useState(() => resolveMediaUrl(src));
  const settledRef = useRef(false);

  useEffect(() => {
    settledRef.current = false;
    if (currentSrc === fallbackSrc) return undefined;
    const timer = setTimeout(() => {
      if (!settledRef.current) setCurrentSrc(fallbackSrc);
    }, CDN_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [currentSrc, fallbackSrc]);

  return (
    <Image
      {...props}
      src={currentSrc}
      onLoad={() => {
        settledRef.current = true;
      }}
      onError={() => {
        settledRef.current = true;
        if (currentSrc !== fallbackSrc) setCurrentSrc(fallbackSrc);
      }}
    />
  );
}

"use client";

import { useSyncExternalStore } from "react";

// Null on the server and during hydration, so callers can wait for the real value
// (for example, to download only the video cut that fits the screen).
export function useMediaQuery(query: string): boolean | null {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => null,
  );
}

// False until known: the animated markup is the default, and the effects that
// drive it only run on the client.
export function useReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)") ?? false;
}

"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Site-wide first-load experience: a branded loading screen (logo video) that plays once per browser session, followed by a GSAP
 * entrance animation on the page content once it's ready.
 *
 * How the "once per session, no flash" part works:
 *  - `app/layout.tsx` inlines a tiny synchronous script (next/script
 *    strategy="beforeInteractive") that adds a `pl-loading` class to
 *    <html> BEFORE first paint, but only if sessionStorage doesn't already
 *    have the "seen it" flag. `app/globals.css` hides #page-content while
 *    that class is present — that's what prevents a flash of the fully
 *    built page before this component has a chance to react.
 *  - `phase` below is read with useSyncExternalStore (the same technique
 *    CreamGradientBackground.tsx uses) instead of an effect + setState, so
 *    the hydration render always agrees with the server ("pending", loader
 *    not shown yet) and only resolves to "skip" or "show" right after —
 *    no synchronous setState-in-effect, no extra flash-then-hide render.
 *  - "skip" (session already flagged, or prefers-reduced-motion) means the
 *    loader never renders at all and the content is simply revealed.
 *    "show" runs the loader + progress bar, then fades/slides the content
 *    in and flags the session so later pages in the same tab go straight
 *    to "skip".
 *
 * The progress bar isn't wired to a real asset-loading percentage (there
 * isn't a meaningful one on a mostly-static marketing site) — it fills
 * over a capped duration, but genuinely waits for `window.load` (up to a
 * ceiling) so slower first loads don't reveal a half-ready page early.
 */

const SESSION_KEY = "ceylexa-loaded";
// The loader plays public/videos/loader.mp4 (6s). We reveal the page once the
// page has loaded AND the video has finished, with a hard cap as a safety net.
const MAX_WAIT_MS = 6800;
const VIDEO_FALLBACK_MS = 1500; // if the video cannot play at all

function subscribeNever() {
  return () => {};
}

function getPhaseSnapshot(): "skip" | "show" {
  let alreadySeen = false;
  try {
    alreadySeen = sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    // sessionStorage unavailable (private mode, etc.) — treat as unseen.
  }
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return alreadySeen || reduceMotion ? "skip" : "show";
}

function getPhaseServerSnapshot(): "pending" {
  return "pending";
}

export default function PageLoader({ children }: { children: ReactNode }) {
  const phase = useSyncExternalStore(subscribeNever, getPhaseSnapshot, getPhaseServerSnapshot);
  const [loaderDone, setLoaderDone] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (phase === "pending") return;

    if (phase === "skip") {
      document.documentElement.classList.remove("pl-loading");
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // ignore
      }
      return;
    }

    // phase === "show"
    let pageLoaded = document.readyState === "complete";
    let videoDone = false;
    let revealed = false;
    const timers: number[] = [];

    const ctx = gsap.context(() => {
      gsap.set(contentRef.current, { opacity: 0, y: 24 });
    });

    const revealNow = () => {
      if (revealed) return;
      revealed = true;
      const tl = gsap.timeline({
        onComplete: () => {
          document.documentElement.classList.remove("pl-loading");
          try {
            sessionStorage.setItem(SESSION_KEY, "1");
          } catch {
            // ignore
          }
          setLoaderDone(true);
        },
      });
      tl.to(loaderRef.current, { opacity: 0, duration: 0.5, ease: "power2.out" }).to(
        contentRef.current,
        { opacity: 1, y: 0, duration: 0.85, ease: "power3.out" },
        "<"
      );
    };

    const check = () => {
      if (pageLoaded && videoDone) revealNow();
    };

    const onLoad = () => {
      pageLoaded = true;
      check();
    };
    const onVideoDone = () => {
      videoDone = true;
      check();
    };

    if (!pageLoaded) window.addEventListener("load", onLoad, { once: true });

    const video = videoRef.current;
    if (video) {
      video.addEventListener("ended", onVideoDone);
      video.addEventListener("error", () => timers.push(window.setTimeout(onVideoDone, VIDEO_FALLBACK_MS)));
      video.play().catch(() => timers.push(window.setTimeout(onVideoDone, VIDEO_FALLBACK_MS)));
    } else {
      videoDone = true;
    }
    check();
    timers.push(window.setTimeout(revealNow, MAX_WAIT_MS));

    return () => {
      ctx.revert();
      window.removeEventListener("load", onLoad);
      video?.removeEventListener("ended", onVideoDone);
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [phase]);

  const showLoaderEl = phase === "show" && !loaderDone;

  return (
    <>
      {showLoaderEl && (
        <div
          ref={loaderRef}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black"
          role="status"
          aria-live="polite"
          aria-label="Loading"
        >
          <video
            ref={videoRef}
            className="h-full w-full max-w-[1280px] object-contain"
            src="/videos/loader.mp4"
            poster="/videos/loader-poster.jpg"
            muted
            playsInline
            autoPlay
            preload="auto"
            aria-hidden="true"
          />
        </div>
      )}
      <div
        id="page-content"
        ref={contentRef}
        className="[html.pl-loading_&]:opacity-0 motion-reduce:[html.pl-loading_&]:opacity-100"
      >
        {children}
      </div>
    </>
  );
}

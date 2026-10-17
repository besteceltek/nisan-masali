"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Cue = "open" | "turn";

type AudioPaths = {
  theme: string;
  bookOpen: string;
  pageTurn: string;
};

async function assetExists(url: string): Promise<boolean> {
  if (!url) return false;
  try {
    const response = await fetch(url, { method: "HEAD" });
    if (!response.ok) return false;
    const type = response.headers.get("content-type") ?? "";
    if (type.includes("text/html")) return false;
    return true;
  } catch {
    return false;
  }
}

export function useStoryAudio(paths: AudioPaths) {
  const themeRef = useRef<HTMLAudioElement | null>(null);
  const ready = useRef({ open: false, turn: false });
  const mutedRef = useRef(false);
  const [themeReady, setThemeReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    mutedRef.current = muted;
    if (themeRef.current) themeRef.current.muted = muted;
  }, [muted]);

  useEffect(() => {
    let cancelled = false;

    void assetExists(paths.theme).then((ok) => {
      if (!cancelled) setThemeReady(ok);
    });
    void assetExists(paths.bookOpen).then((ok) => {
      if (!cancelled) ready.current.open = ok;
    });
    void assetExists(paths.pageTurn).then((ok) => {
      if (!cancelled) ready.current.turn = ok;
    });

    return () => {
      cancelled = true;
    };
  }, [paths.bookOpen, paths.pageTurn, paths.theme]);

  useEffect(() => {
    return () => {
      themeRef.current?.pause();
      themeRef.current = null;
    };
  }, []);

  const ensureTheme = useCallback(() => {
    if (!paths.theme) return null;
    if (!themeRef.current) {
      const audio = new Audio(paths.theme);
      audio.loop = true;
      audio.preload = "auto";
      audio.volume = 0.85;
      audio.addEventListener("error", () => {
        setThemeReady(false);
        setPlaying(false);
      });
      themeRef.current = audio;
    }
    themeRef.current.muted = mutedRef.current;
    return themeRef.current;
  }, [paths.theme]);

  const activateTheme = useCallback(() => {
    const audio = ensureTheme();
    if (!audio) return;
    if (!audio.paused && !audio.ended && audio.currentTime > 0) {
      setPlaying(true);
      return;
    }
    const pending = audio.play();
    void pending
      ?.then(() => {
        setThemeReady(true);
        setPlaying(true);
        setBlocked(false);
      })
      .catch((error: unknown) => {
        const name = error instanceof DOMException ? error.name : "";
        if (name === "NotAllowedError") {
          setBlocked(true);
          return;
        }
        setThemeReady(false);
        setPlaying(false);
      });
  }, [ensureTheme]);

  const playCue = useCallback(
    (cue: Cue) => {
      if (mutedRef.current) return;
      const known = cue === "open" ? ready.current.open : ready.current.turn;
      const url = cue === "open" ? paths.bookOpen : paths.pageTurn;
      if (!known || !url) return;
      const effect = new Audio(url);
      effect.volume = cue === "open" ? 0.8 : 0.55;
      void effect.play().catch(() => {});
    },
    [paths.bookOpen, paths.pageTurn],
  );

  const toggleMute = useCallback(() => {
    setMuted((value) => {
      const next = !value;
      mutedRef.current = next;
      if (themeRef.current) themeRef.current.muted = next;
      if (!next && themeRef.current?.paused) {
        void themeRef.current.play().catch(() => setBlocked(true));
      }
      return next;
    });
  }, []);

  return {
    themeReady,
    playing,
    muted,
    blocked,
    activateTheme,
    playCue,
    toggleMute,
  };
}

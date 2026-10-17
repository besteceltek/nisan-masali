"use client";

import { invitation } from "@/config/invitation";
import { useStoryAudio } from "@/hooks/useStoryAudio";
import { bookReducer, initialBookState } from "@/lib/book-reducer";
import { COVER_MS, TURN_MS } from "@/lib/motion";
import { useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useReducer, useRef } from "react";
import { BookStage } from "./BookStage";

export function Storybook() {
  const pages = useMemo(() => ["invitation"], []);
  const [state, dispatch] = useReducer(
    (current: typeof initialBookState, action: Parameters<typeof bookReducer>[1]) =>
      bookReducer(current, action, pages.length),
    initialBookState,
  );
  const reduce = useReducedMotion();
  const audio = useStoryAudio(invitation.audio);
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const busy = state.phase === "opening" || state.phase === "closing" || state.turn !== null;

  const openBook = () => {
    if (state.phase !== "closed") return;
    audio.activateTheme();
    if (reduce) {
      dispatch({ type: "open" });
      dispatch({ type: "opened" });
      return;
    }
    dispatch({ type: "open" });
  };

  const closeBook = () => {
    if (state.phase !== "open" || state.turn) return;
    if (reduce) {
      dispatch({ type: "close" });
      dispatch({ type: "closed" });
      return;
    }
    dispatch({ type: "close" });
  };

  const goNext = () => {
    if (state.phase !== "open" || state.turn) return;
    if (state.index >= pages.length - 1) {
      closeBook();
      return;
    }
    if (reduce) {
      dispatch({ type: "turn-next" });
      dispatch({ type: "turn-done" });
      return;
    }
  };

  const goPrev = () => {
    if (state.phase !== "open" || state.turn) return;
    if (state.index <= 0) {
      closeBook();
      return;
    }
    if (reduce) {
      dispatch({ type: "turn-prev" });
      dispatch({ type: "turn-done" });
      return;
    }
    dispatch({ type: "turn-prev" });
  };

  useEffect(() => {
    if (state.phase !== "opening" && state.phase !== "closing" && !state.turn) return;
    const ms =
      (reduce ? 40 : state.turn ? TURN_MS : COVER_MS) + 180;
    const timer = window.setTimeout(() => {
      if (state.phase === "opening") dispatch({ type: "opened" });
      else if (state.phase === "closing") dispatch({ type: "closed" });
      else if (state.turn) dispatch({ type: "turn-done" });
    }, ms);
    return () => window.clearTimeout(timer);
  }, [reduce, state.phase, state.turn]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      if (event.key === "ArrowRight" || event.key === "PageDown") {
        event.preventDefault();
        goNext();
      } else if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        goPrev();
      } else if (event.key === "Escape") {
        event.preventDefault();
        closeBook();
      } else if (event.key === "Enter" && state.phase === "closed") {
        if (target?.closest("button,a")) return;
        event.preventDefault();
        openBook();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const onPointerDown = (event: React.PointerEvent<HTMLElement>) => {
    if (state.phase !== "open" || busy) return;
    if (event.target instanceof Element && event.target.closest("a,button")) return;
    pointer.current = { x: event.clientX, y: event.clientY };
  };

  const onPointerUp = (event: React.PointerEvent<HTMLElement>) => {
    if (!pointer.current) return;
    const dx = event.clientX - pointer.current.x;
    const dy = event.clientY - pointer.current.y;
    pointer.current = null;
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) goNext();
    else goPrev();
  };

  return (
    <main
      className="stage"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => {
        pointer.current = null;
      }}
    >
      <div className="atmosphere" aria-hidden="true">
        {Array.from({ length: 10 }, (_, index) => (
          <span key={index} className={`mote mote-${index + 1}`} />
        ))}
      </div>
      <p className="sr-only">
        Sağ ok sonraki sayfa, sol ok önceki sayfa, Escape kitabı kapatır.
      </p>
      <BookStage
        state={state}
        pages={pages}
        onOpen={openBook}
        onOpened={() => dispatch({ type: "opened" })}
        onClosed={() => dispatch({ type: "closed" })}
        onTurnDone={() => dispatch({ type: "turn-done" })}
        onReplay={closeBook}
      />
      <div className="book-shadow" aria-hidden="true" />
    </main>
  );
}

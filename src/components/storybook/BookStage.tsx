"use client";

import { invitation } from "@/config/invitation";
import type { BookState } from "@/lib/book-reducer";
import { COVER_EASE, COVER_MS, spreadView } from "@/lib/motion";
import { motion, useReducedMotion } from "framer-motion";
import { PageSheet } from "./PageSheet";
import Image from "next/image";

function CoverFace() {
  return (
    <>
      <div className="cover-face cover-front">
        <h1>{invitation.couple.firstName}</h1>
        <h1>{invitation.couple.secondName}</h1>
      </div>
      <div className="cover-face cover-inside" aria-hidden="true">
        <div className="endpaper-mark">
          <Image
            className="endpaper-couple"
            src="/images/couple.png"
            alt=""
            width={941}
            height={849}
          />
          <Image
            className="endpaper-landscape"
            src="/images/grass.png"
            alt=""
            width={1424}
            height={337}
          />
        </div>
      </div>
    </>
  );
}

export function BookStage({
  state,
  pages,
  onOpen,
  onOpened,
  onClosed,
  onReplay,
}: {
  state: BookState;
  pages: string[];
  onOpen: () => void;
  onOpened: () => void;
  onClosed: () => void;
  onTurnDone: () => void;
  onReplay: () => void;
}) {
  const reduce = useReducedMotion();
  const view = spreadView(state);
  const duration = reduce ? 0.01 : COVER_MS / 1000;
  const coverOpen = state.phase === "opening" || state.phase === "open";
  const rightPage = pages[view.rightIndex];
  const leftPage = view.leftIndex >= 0 ? pages[view.leftIndex] : undefined;
  const showLeft = Boolean(leftPage) && state.phase === "open";

  return (
    <div className="shift" data-phase={state.phase}>
      <div className="scene">
        <div
          className="book"
          data-phase={state.phase}
          data-open={coverOpen ? "true" : "false"}
        >
          <div
            className="left-board"
            style={{
              visibility: showLeft ? "visible" : "hidden",
              zIndex: showLeft ? 5 : 1,
            }}
          >
            <PageSheet side="left" onReplay={onReplay} />
          </div>

          <div
            className="right-board"
            style={{ zIndex: state.phase === "open" ? 4 : 2 }}
          >
            {rightPage ? <PageSheet side="right" onReplay={onReplay} /> : null}
          </div>

          <motion.div
            className="cover"
            initial={false}
            animate={{ rotateY: coverOpen ? -180 : 0 }}
            transition={{ duration, ease: COVER_EASE }}
            onAnimationComplete={() => {
              if (state.phase === "opening") onOpened();
              if (state.phase === "closing") onClosed();
            }}
            onClick={() => {
              if (state.phase === "closed") onOpen();
            }}
            style={{
              transformStyle: "preserve-3d",
              transformOrigin: "left center",
            }}
            role={state.phase === "closed" ? "button" : undefined}
            tabIndex={state.phase === "closed" ? 0 : undefined}
            aria-label={state.phase === "closed" ? "Kitabı aç" : undefined}
            onKeyDown={(event) => {
              if (state.phase !== "closed") return;
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onOpen();
              }
            }}
          >
            <CoverFace />
          </motion.div>

          <span className="plinth" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

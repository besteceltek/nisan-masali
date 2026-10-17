export type Phase = "closed" | "opening" | "open" | "closing";

export type Turn = {
  direction: "next" | "prev";
  fromIndex: number;
} | null;

export type BookState = {
  phase: Phase;
  index: number;
  turn: Turn;
};

export type BookAction =
  | { type: "open" }
  | { type: "opened" }
  | { type: "close" }
  | { type: "closed" }
  | { type: "turn-next" }
  | { type: "turn-prev" }
  | { type: "turn-done" };

export const initialBookState: BookState = {
  phase: "closed",
  index: 0,
  turn: null,
};

export function bookReducer(
  state: BookState,
  action: BookAction,
  pageCount: number,
): BookState {
  switch (action.type) {
    case "open":
      if (state.phase !== "closed") return state;
      return { ...state, phase: "opening" };
    case "opened":
      if (state.phase !== "opening") return state;
      return { phase: "open", index: 0, turn: null };
    case "close":
      if (state.phase !== "open" || state.turn) return state;
      return { ...state, phase: "closing" };
    case "closed":
      if (state.phase !== "closing") return state;
      return initialBookState;
    case "turn-next":
      if (state.phase !== "open" || state.turn) return state;
      if (state.index >= pageCount - 1) return state;
      return { ...state, turn: { direction: "next", fromIndex: state.index } };
    case "turn-prev":
      if (state.phase !== "open" || state.turn) return state;
      if (state.index <= 0) return state;
      return { ...state, turn: { direction: "prev", fromIndex: state.index } };
    case "turn-done": {
      if (!state.turn) return state;
      const nextIndex =
        state.turn.direction === "next"
          ? state.turn.fromIndex + 1
          : state.turn.fromIndex - 1;
      if (nextIndex < 0 || nextIndex >= pageCount) {
        return { ...state, turn: null };
      }
      return { ...state, index: nextIndex, turn: null };
    }
    default:
      return state;
  }
}

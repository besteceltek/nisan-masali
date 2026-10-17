export const COVER_MS = 1400;
export const TURN_MS = 980;
export const COVER_EASE = [0.42, 0.05, 0.2, 1] as const;
export const TURN_EASE = [0.45, 0.02, 0.15, 1] as const;

export type SpreadView = {
  rightIndex: number;
  leftIndex: number;
};

export function spreadView(input: {
  index: number;
  turn: { direction: "next" | "prev"; fromIndex: number } | null;
}): SpreadView {
  const { index, turn } = input;
  if (turn?.direction === "next") {
    return {
      rightIndex: turn.fromIndex + 1,
      leftIndex: turn.fromIndex - 1,
    };
  }
  if (turn?.direction === "prev") {
    return {
      rightIndex: turn.fromIndex,
      leftIndex: turn.fromIndex - 2,
    };
  }
  return {
    rightIndex: index,
    leftIndex: index - 1,
  };
}

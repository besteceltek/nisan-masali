import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bookReducer, initialBookState } from "./book-reducer";

const count = 3;

describe("bookReducer", () => {
  it("opens, turns, and closes without skipping pages", () => {
    let state = bookReducer(initialBookState, { type: "open" }, count);
    assert.equal(state.phase, "opening");
    state = bookReducer(state, { type: "opened" }, count);
    assert.deepEqual(state, { phase: "open", index: 0, turn: null });

    state = bookReducer(state, { type: "turn-next" }, count);
    assert.equal(state.turn?.direction, "next");
    state = bookReducer(state, { type: "turn-next" }, count);
    assert.equal(state.turn?.fromIndex, 0, "a second turn is ignored while one is running");
    state = bookReducer(state, { type: "turn-done" }, count);
    assert.equal(state.index, 1);
    assert.equal(state.turn, null);

    state = bookReducer(state, { type: "turn-prev" }, count);
    state = bookReducer(state, { type: "turn-done" }, count);
    assert.equal(state.index, 0);

    state = bookReducer(state, { type: "close" }, count);
    assert.equal(state.phase, "closing");
    state = bookReducer(state, { type: "closed" }, count);
    assert.deepEqual(state, initialBookState);
  });

  it("rejects turns past the ends and closing mid-turn", () => {
    let state = bookReducer(initialBookState, { type: "opened" }, count);
    assert.equal(state.phase, "closed");

    state = { phase: "open", index: 0, turn: null };
    assert.equal(bookReducer(state, { type: "turn-prev" }, count), state);

    state = { phase: "open", index: 2, turn: null };
    assert.equal(bookReducer(state, { type: "turn-next" }, count), state);

    state = { phase: "open", index: 1, turn: { direction: "next", fromIndex: 1 } };
    assert.equal(bookReducer(state, { type: "close" }, count).phase, "open");
  });
});

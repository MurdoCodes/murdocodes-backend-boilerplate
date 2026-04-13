import { add } from "../utils/tests";

// Type assertions work at compile time
const result: number = add(1, 2);

it("type check", () => {
  expect(result).toBe(3);
});

/**
 * A race can only be created with at least 2 students.
  ● Different students cannot be assigned to the same lane.
  ● The same student cannot be assigned to more than one lane in the same race.
  ● The final places in the race must be entered without gaps, i.e. 1, 2, 4 should not be
  possible to be entered.
  ● In the case of a tie, the next available place should skip the number of tied athletes, for
  example in the case of 2 ties for 1st, the next athlete cannot place 2nd but instead needs
  to place 3rd (1, 1, 3). In the case of 3 ties for 1st, the next athlete must place 4th (1, 1, 1,
  4), and so on. This is also valid for ties in other places, e.g. (1, 2, 2, 4).
 */

import { describe, test, expect } from "@jest/globals";
import { createRace } from "./race";
import { students } from "./students";

describe("Race Creation", () => {
  test("should not allow race creation with less than 2 students", () => {
    const race = createRace([students[0]]);
    expect(race.status).toBe("cancelled");
    expect(race.errorMessage).toBeDefined();
    expect(race.errorMessage).toContain("Not enough competitors for this race");
  });

  test("should not allow the same student to be assigned to multiple lanes", () => {
    const duplicateStudents = [students[0], students[0], students[0]];
    const race = createRace(duplicateStudents);
    expect(race.status).toBe("cancelled");
    expect(race.errorMessage).toBeDefined();
    expect(race.errorMessage).toContain("is already assigned to another lane");
  });

  test("Should not have one lane with multiple students", () => {
    const race = createRace(students);
    expect(race.status).toBe("cancelled");
    expect(race.errorMessage).toBeDefined();
    expect(race.errorMessage).toContain("Not enough competitors for this race");
  })
});

// describe("Race Simulation", () => {
//   test("should ensure no gaps in final positions", () => {
//     const race = createRace(students);
//     simulateRace(race);
//     const finalPositions = Array.from(race.finishingPositions.keys());
//     const expectedPositions = Array.from({ length: finalPositions.length }, (_, i) => i + 1);
//     expect(finalPositions).toEqual(expectedPositions);
//   });

//   test("should handle ties correctly (1,1,3)", () => {
//     const race = createRace([students[0], students[1], students[2]]);
//     simulateRace(race);
//     const positions = Array.from(race.finishingPositions.keys());
//     expect(positions).toEqual(expect.arrayContaining([1, 1, 3]));
//   });

//   test("should handle ties correctly (1,1,1,4)", () => {
//     const race = createRace([students[0], students[1], students[2], students[3]]);
//     simulateRace(race);
//     const positions = Array.from(race.finishingPositions.keys());
//     expect(positions).toEqual(expect.arrayContaining([1, 1, 1, 4]));
//   });

//   test("should handle mixed ties correctly (1,2,2,4)", () => {
//     const race = createRace([students[0], students[1], students[2], students[3]]);
//     simulateRace(race);
//     const positions = Array.from(race.finishingPositions.keys());
//     expect(positions).toEqual(expect.arrayContaining([1, 2, 2, 4]));
//   });
// });

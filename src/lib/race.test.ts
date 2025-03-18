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
import { addLanesToRace, assignStudentsToLanes, createRace, simulateRace } from "./race";
import { students, TStudent } from "./students";

describe("Race Creation", () => {
  test("should not allow race creation with less than 2 students", () => {
    const race = createRace([students[0]]);
    expect(race.status).toBe("cancelled");
    expect(race.errorMessage).toBeDefined();
    expect(race.errorMessage).toContain("Not enough competitors for this race");
  });
});

describe("Assigning Lanes", () => {
  test("should not allow the same student to be assigned to multiple lanes", () => {
    const duplicateStudents = [students[0], students[0], students[0]];
    const { lanes, errorMessage } = assignStudentsToLanes(duplicateStudents);

    expect(errorMessage).toBeDefined();
    expect(errorMessage).toContain("is already assigned to another lane");
    expect(lanes.size).toBeLessThan(duplicateStudents.length);
  });

  test("Should not have one lane with multiple students", () => {
    // This would actually be enforced by Map, since I can't have teh same key twice
    // and each key only allows one TStudent
    // but aiming for total test coverage as the premise says
    const race = createRace(students);
    const { lanes } = assignStudentsToLanes(students);
    const readyRace = addLanesToRace({ race, lanes });

    expect(readyRace.status).toBe("ready");
    expect(readyRace.errorMessage).toBeUndefined();

    readyRace.lanes.set(1, [students[0], students[1]] as unknown as TStudent);
    const finalRace = addLanesToRace({ race: readyRace, lanes: readyRace.lanes });

    expect(finalRace.status).toBe("cancelled");
    expect(finalRace.errorMessage).toBeDefined();
    expect(finalRace.errorMessage).toContain("contains multiple students instead of one");
  })
})

describe("Race Simulation", () => {
  test("should ensure no gaps in final positions", () => {
    const race = createRace(students);
    const { lanes } = assignStudentsToLanes(students);
    const readyRace = addLanesToRace({ race, lanes });

    expect(readyRace.status).toBe("ready");
    simulateRace(readyRace);

    expect(validateRacePositions(readyRace.finishingPositions)).toBe(true);

    function validateRacePositions(finishingPositions: Map<number, TStudent[]>): boolean {
      let expectedPosition = 1;

      for (const [position, students] of finishingPositions) {
        if (position !== expectedPosition) {
          console.error(`❌ [Error]: Invalid position order. Expected ${expectedPosition}, but got ${position}.`);
          return false;
        }

        expectedPosition += students.length;
      }

      return true;
    }
  });

  test("should handle ties correctly, not having results like (1,1,3), (1,1,1,4), (1,2,2,4)", () => {
    // Again this would be enforced by Map no allowing duplicate keys
    const race = createRace(students);
    const { lanes } = assignStudentsToLanes(students);
    const readyRace = addLanesToRace({ race, lanes });

    expect(readyRace.status).toBe("ready");

    simulateRace(readyRace);

    const positions = Array.from(readyRace.finishingPositions.keys());
    const uniquePositions = new Set(positions);
    expect(uniquePositions.size).toBe(positions.length);
  });
});

import { render, screen } from "@testing-library/react";
import Results from "../results";
import { TRace } from "@/lib/race";
import '@testing-library/jest-dom';

describe("Results Component", () => {
  test("renders 'No results available yet' when there are no results", () => {
    render(<Results finishedRace={undefined} />);

    expect(screen.getByText("No results available yet.")).toBeInTheDocument();
  });

  test("renders correct race positions and students", () => {
    const finishedRace: TRace = {
      status: "finished",
      lanes: new Map(),
      finishingPositions: new Map([
        [1, [{ id: 101, name: "Alice Johnson" }, { id: 102, name: "Bob Smith" }]],
        [3, [{ id: 103, name: "Charlie Brown" }]],
      ]),
    };

    render(<Results finishedRace={finishedRace} />);

    expect(screen.getByText("Position 1")).toBeInTheDocument();
    expect(screen.getByText("Position 3")).toBeInTheDocument();

    expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
    expect(screen.getByText("Bob Smith")).toBeInTheDocument();
    expect(screen.getByText("Charlie Brown")).toBeInTheDocument();
  });

  test("does not render empty positions", () => {
    const finishedRace: TRace = {
      status: "finished",
      lanes: new Map(),
      finishingPositions: new Map(),
    };

    render(<Results finishedRace={finishedRace} />);

    expect(screen.getByText("No results available yet.")).toBeInTheDocument();
    expect(screen.queryByText(/Position \d+/)).not.toBeInTheDocument();
  });
});
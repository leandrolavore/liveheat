import { TStudent } from "./students";

export type TRace = {
  status: 'preparing' | 'ready' | 'started' | 'finished' | 'cancelled';
  lanes: Map<number, TStudent>;
  finishingPositions: Map<number, TStudent[]>;
  errorMessage?: string;
};

export function createRace(students: TStudent[]) {
  const race: TRace = {
    status: 'preparing',
    lanes: new Map(),
    finishingPositions: new Map()
  };

  if (students.length < 2) {
    race.status = 'cancelled';
    race.errorMessage = `❌[Error: Not enough competitors for this race]: Only ${students.length} provided.`;

    return race;
  }

  return race;
}

export function assignStudentsToLanes(students: TStudent[]) {
  const lanes = new Map<number, TStudent>();
  const assignedStudents = new Set<number>();
  let errorMessage: string | undefined = undefined;


  for (let index = 0; index < students.length; index++) {
    const student = students[index];

    if (assignedStudents.has(student.id)) {
      errorMessage = `❌[Error: Student ${student.name} is already assigned to another lane]`;
      return { lanes, errorMessage };

    }
    lanes.set(index + 1, student);
    assignedStudents.add(student.id);
  }

  return { lanes, errorMessage };
}

export function addLanesToRace({ race, lanes }: { race: TRace, lanes: Map<number, TStudent> }) {
  const laneCounts = new Map<number, number>();

  for (const lane of lanes.keys()) {
    const student = lanes.get(lane);

    if (Array.isArray(student)) {
      race.status = 'cancelled';
      race.errorMessage = `❌[Error: Lane ${lane} contains multiple students instead of one]`;

      return race;
    }

    laneCounts.set(lane, (laneCounts.get(lane) || 0) + 1);

    if (laneCounts.get(lane)! > 1) {
      race.status = 'cancelled';
      race.errorMessage = `❌[Error: Lane ${lane} has multiple students assigned]`;

      return race;
    }
  }

  race.lanes = lanes;

  if (race.lanes.size < 2) {
    race.status = 'cancelled';
    race.errorMessage = `❌[Error: Not enough lanes ready]: Only ${race.lanes.size} lanes assigned.`;

    return race;
  }

  race.status = 'ready';
  return race;
}

export function simulateRace(race: TRace) {
  if (race.status !== 'ready') {
    throw new Error(`❌[Error: Race cannot start from status '${race.status}']`);
  }

  race.status = 'started';

  const students = Array.from(race.lanes.values());
  const shuffled = students.sort(() => Math.random() - 0.5);
  let position = 1;

  while (shuffled.length > 0) {
    const tieCount = Math.floor(Math.random() * 2) + 1;
    const tiedStudents = shuffled.splice(0, tieCount);

    race.finishingPositions.set(position, tiedStudents);
    position += tiedStudents.length;
  }

  race.status = 'finished';

  return race;
}
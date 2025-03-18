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

  students.forEach((student, index) => {
    if (race.lanes.has(index + 1)) {
      race.status = 'cancelled';
      race.errorMessage = `❌[Error: Duplicate lane assignment detected for lane ${index + 1}]`;

      return race;
    }

    race.lanes.set(index + 1, student);
  });

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
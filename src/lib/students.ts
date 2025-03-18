export type TStudent = {
  name: string;
  id: number;
}

// Using set to make sure there are no
const students: TStudent[] = Array.from(
  new Set([
    { name: "Alice Johnson", id: 101 },
    { name: "Bob Smith", id: 102 },
    { name: "Charlie Brown", id: 103 },
    { name: "David Williams", id: 104 },
    { name: "Emma Davis", id: 105 },
    { name: "Frank Miller", id: 106 },
    { name: "Grace Wilson", id: 107 },
    { name: "Henry Martinez", id: 108 },
    { name: "Isabella Moore", id: 109 },
    { name: "Jack Anderson", id: 110 },
  ].map(s => JSON.stringify(s)))
).map(str => JSON.parse(str)) as TStudent[];

// Scenario is students presenting to compete
export function getStudentsForRace(n?: number) {
  const numStudents = n ?? Math.floor(Math.random() * students.length) + 1;
  const shuffled = [...students].sort(() => Math.random() - 0.5);

  return shuffled.slice(0, numStudents);
}
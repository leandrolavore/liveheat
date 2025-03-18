'use client';

import React, { useState } from 'react';
import { addLanesToRace, createRace, simulateRace, TRace } from '@/lib/race';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import StudentsSelect from './students-select';
import { Button } from './ui/button';
import Results from './results';
import { TStudent, students } from "@/lib/students";
import Lanes from './lanes';

const View = () => {
  const [lanes, setLanes] = useState<Map<number, TStudent>>(new Map());
  const [finishedRace, setFinishedRace] = useState<TRace>();

  const addStudent = (student: TStudent) => {
    if (![...lanes.values()].some((s) => s?.id === student.id)) {
      setLanes((prev) => {
        const newLanes = new Map(prev);
        for (let i = 1; i <= students.length; i++) {
          if (!newLanes.has(i)) {
            newLanes.set(i, student);
            break;
          }
        }
        return newLanes;
      });
    }
  };

  const removeStudent = (student: TStudent) => {
    setLanes((prev) => {
      const newLanes = new Map([...prev.entries()].sort(([a], [b]) => a - b));
      let shift = false;

      for (let i = 1; i <= students.length; i++) {
        if (shift || newLanes.get(i)?.id === student.id) {
          newLanes.delete(i);
          shift = true;
        }

        if (shift && newLanes.has(i + 1)) {
          newLanes.set(i, newLanes.get(i + 1)!);
          newLanes.delete(i + 1);
        }
      }

      return newLanes;
    });
  }

  const startCompetition = () => {
    const students = Array.from(lanes.values());
    const race = createRace(students);
    const readyRace = addLanesToRace({ race, lanes });
    setFinishedRace(simulateRace(readyRace));
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className='text-4xl'>🏁 Race 🏁</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col lg:flex-row gap-4 h-full">
        <StudentsSelect addStudent={addStudent} />
        <Lanes lanes={lanes} removeStudent={removeStudent} />
        <Results finishedRace={finishedRace} />
      </CardContent>
      <CardFooter className='ml-auto'>
        <Button
          className='cursor-pointer'
          disabled={lanes.size === 0}
          onClick={startCompetition}
        >
          {finishedRace ? 'Repeat Race' : 'Start Race'}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default View;
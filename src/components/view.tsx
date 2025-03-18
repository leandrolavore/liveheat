'use client';

import React, { useEffect, useState } from 'react';
import { getStudentsForRace } from '@/lib/students';
import { addLanesToRace, assignStudentsToLanes, createRace, simulateRace, TRace } from '@/lib/race';

const View = () => {
  const [error, setError] = useState<string>();
  const [finishedRace, setFinishedRace] = useState<TRace>();
  console.log("🚀 ~ View ~ finishedRace:", finishedRace)

  const startCompetition = () => {
    const randomStudents = getStudentsForRace();
    const race = createRace(randomStudents);
    const { lanes, errorMessage } = assignStudentsToLanes(randomStudents);

    if (!lanes || errorMessage) {
      setError('No lanes');

      return;
    }

    const readyRace = addLanesToRace({ race, lanes });
    setFinishedRace(simulateRace(readyRace))
  }

  useEffect(() => {
    startCompetition();
  }, [])

  return (
    <div>
      Test
      {error ? 'There was an error on the race' : ''}
    </div>
  )
}

export default View

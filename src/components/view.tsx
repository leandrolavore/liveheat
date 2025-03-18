'use client';

import React, { useState } from 'react';
import { getStudentsForRace } from '@/lib/students';
import { createRace, simulateRace } from '@/lib/race';

const View = () => {
  const [error, setError] = useState<string>();


  const randomStudents = getStudentsForRace(0);
  console.log('random students', randomStudents);

  const randomRace = createRace(randomStudents);
  console.log("🚀 ~ View ~ randomRace:", randomRace);

  if (randomRace.status === 'cancelled') {
    setError(randomRace.errorMessage || 'There was an error putting the race together');
  } else {
    const finsihedRace = simulateRace(randomRace);
    console.log("🚀 ~ View ~ finsihedRace:", finsihedRace);
  }

  return (
    <div>
      Test
      {error ? 'There was an error on the race' : ''}
    </div>
  )
}

export default View

import { TRace } from '@/lib/race'
import React from 'react'
import { Card, CardDescription } from './ui/card';

const Results = ({ finishedRace }: { finishedRace?: TRace }) => {
  return (
    <div className='flex flex-col gap-4 w-full'>
      <h2 className="text-lg font-semibold mb-2">Results</h2>
      <CardDescription className="mb-2">Positions</CardDescription>
      <Card className="max-h-96 overflow-y-scroll p-4 flex-1">
        {!finishedRace || finishedRace?.finishingPositions.size === 0 ? (
          <p className="text-gray-500">No results available yet.</p>
        ) : (
          <div>
            {finishedRace?.finishingPositions?.size &&
              [...finishedRace?.finishingPositions.entries()].map(([position, students]) => (
                <div key={position} className="border-b py-2">
                  <span className="font-bold">Position {position}</span>
                  <ul className="ml-4 list-disc">
                    {students.map(student => (
                      <li key={student.id}>{student.name}</li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        )}
      </Card>
    </div>
  );
}

export default Results;
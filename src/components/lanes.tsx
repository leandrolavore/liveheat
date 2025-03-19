import React from 'react'
import { students, TStudent } from "@/lib/students";
import { Card, CardDescription } from "./ui/card";
import { IoMdRemove } from "react-icons/io";
import { Button } from "./ui/button";

type LanesProps = {
  lanes: Map<number, TStudent>;
  removeStudent: (student: TStudent) => void;
};

const Lanes: React.FC<LanesProps> = ({ lanes, removeStudent }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-lg font-semibold mb-2">Lanes 🚥</h2>
      <CardDescription className="mb-2">Empty lanes will be removed</CardDescription>
      <Card className="overflow-y-scroll p-4">
        {students.map((_, index) => {
          const laneNumber = index + 1;
          const student = lanes.get(laneNumber);

          return (
            <div key={laneNumber} className="flex flex-col border-b py-2">
              <span className="text-sm font-semibold">Lane {laneNumber}</span>
              {student ? (
                <div className="flex items-center justify-between">
                  <span>{student.name}</span>
                  <Button
                    className="cursor-pointer"
                    size="sm"
                    variant="ghost"
                    onClick={() => removeStudent(student)}
                  >
                    Remove
                    <IoMdRemove className="text-lg text-red-600" />
                  </Button>
                </div>
              ) : (
                <span className="text-gray-400">Empty</span>
              )}
            </div>
          );
        })}
      </Card>
    </div>
  )
}

export default Lanes

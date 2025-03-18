import React from "react";
import { TStudent, students } from "@/lib/students";
import { Card, CardDescription } from "./ui/card";
import { IoMdAdd } from "react-icons/io";
import { Button } from "./ui/button";

type StudentsSelectProps = {
  addStudent: (student: TStudent) => void;
};

const StudentsSelect: React.FC<StudentsSelectProps> = ({ addStudent }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-lg font-semibold mb-2">Available Students 🧑‍🎓</h2>
      <CardDescription className="mb-2">Select copetitors</CardDescription>
      <Card className="max-h-96 overflow-y-scroll p-4">
        {students.map((s) => (
          <div key={s.id} className="flex items-center justify-between py-2">
            <span>{s.name}</span>
            <Button
              className="cursor-pointer"
              size="sm"
              variant="ghost"
              onClick={() => addStudent(s)}
            >
              Add
              <IoMdAdd className="text-lg text-green-600" />
            </Button>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default StudentsSelect;
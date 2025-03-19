import React, { useState } from "react";
import { TStudent } from "@/lib/students";
import { Card, CardDescription } from "./ui/card";
import { IoMdAdd } from "react-icons/io";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { nanoid } from "nanoid";
import { capitalizeFirstLetter } from "@/lib/helpers";

type StudentsSelectProps = {
  addStudent: (student: TStudent) => void;
};

const StudentsSelect: React.FC<StudentsSelectProps> = ({ addStudent }) => {
  const [students, setStudents] = useState<TStudent[]>([]);

  const studentSchema = z.object({
    firstname: z.string()
      .min(2, { message: "Must be 2 or more characters long" })
      .max(50, { message: "Name is too long" }),
    lastname: z.string()
      .min(2, { message: "Must be 2 or more characters long" })
      .max(50, { message: "Last Name is too long" }),
  });

  const form = useForm<z.infer<typeof studentSchema>>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      firstname: '',
      lastname: ''
    },
    mode: 'onBlur'
  });

  function onSubmit(values: z.infer<typeof studentSchema>) {
    setStudents(prev => [
      ...prev,
      {
        id: parseInt(nanoid(8), 36),
        name: `
          ${capitalizeFirstLetter(values.firstname)}
          ${capitalizeFirstLetter(values.lastname)}
        `
      }
    ]);

    form.reset();
  }

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <div className="flex flex-col flex-1 gap-4 w-full">
        <h2 className="text-lg font-semibold mb-2">Available Students 🧑‍🎓</h2>
        <CardDescription className="mb-2">Add students</CardDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input placeholder="enter name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input placeholder="enter last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button className="cursor-pointer" type="submit">Add student</Button>
            </div>
          </form>
        </Form>
      </div>
      <div className="flex flex-col flex-1 gap-4 w-full overflow-hidden">
        {students?.length ?
          <>
            <CardDescription className="mb-2">Select competitors</CardDescription>
            <Card className="overflow-y-scroll flex-1 p-4">
              {students.map((s) => (
                <div key={s.id} className="flex items-center justify-between py-2">
                  <span>{s.name}</span>
                  <Button
                    className="cursor-pointer"
                    size="sm"
                    variant="ghost"
                    onClick={() => addStudent(s)}
                  >
                    <span className="font-bold">Add to lane</span>
                    <IoMdAdd className="text-lg text-green-600" />
                  </Button>
                </div>
              ))}
            </Card>
          </>
          : <></>}
      </div>
    </div>
  );
};

export default StudentsSelect;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

// for table
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await api.get("/tasks");
      setTasks(response.data);
    };
    fetchTasks();
  }, []);

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    setTasks(tasks.filter((task) => task._id !== id));
  };

  return (
    <>
   
      {/* <h1>List of all todos</h1> */}
      <div className="flex justify-center mt-10 mb-5">
        <Button variant="outline">
        <Link to="/task/new">Add Task</Link>
        </Button>
      </div>

      <div className="w-3/4 mx-auto">  
      <Table>
        <TableCaption>List of all todos</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Due Date</TableHead>
            <TableHead className="text-right">Update</TableHead>
            <TableHead className="text-right">Delete Task</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task._id}>
              <TableCell className="font-medium">{task.title}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>{task.status}</TableCell>
              <TableCell className="text-right">
                {" "}
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : ""}
              </TableCell>
              <TableCell className="text-right">
                <Button asChild>
                  <Link to={`/task/${task._id}`}>Edit</Link>
                </Button>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" onClick={() => deleteTask(task._id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>

    </>
  );
};

export default TaskList;

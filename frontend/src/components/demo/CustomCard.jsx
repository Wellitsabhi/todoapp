import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";
// button
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// select
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// calender
import { Calendar } from "@/components/ui/calendar";

// handleSubmit
const CustomCard = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = { title, description, status, dueDate };
    try {
      if (id) {
        const response = await api.patch(`/tasks/${id}`, {
          title,
          description,
          status,
          dueDate,
        }); 
      } else {
        await api.post("/tasks", taskData);
      }
      navigate("/");
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (id) {
          const response = await api.get(`/tasks/${id}`); // Assuming you're using GET to fetch task details
          const oldState = response.data;
          // console.log(oldState);
          setTitle(oldState.title);
          setDescription(oldState.description);
          setStatus(oldState.status);
          const parsedDueDate = new Date(oldState.dueDate);
          setDueDate(parsedDueDate);
        }
      } catch (error) {
        console.error("Error fetching task details:", error);
      }
    };
    fetchDetails();
  }, []);

  return (
    <>
      <div className="flex justify-center items-center h-screen mt-20 mb-10">
        <div className="rounded-lg shadow-md ">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Make Todo</CardTitle>
              <CardDescription>Complete your task with Todo.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Name of your project"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Description of your project"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={status}
                      onValueChange={(value) => setStatus(value)}
                    >
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="In progress">In progress</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Calendar
                      mode="single"
                      selected={dueDate}
                      onSelect={setDueDate}
                      className="rounded-md border shadow"
                    />
                  </div>

                  <Button
                    disabled={!title || !description || !status || !dueDate}
                    type="submit"
                  >
                    Create
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default CustomCard;

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "./globalContext/AuthContext";
import moment from "moment/moment";

function SingleTask() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");
  const {
    onLoginFormOpen,
    isUserLogin,
    setIsUserLogin,
    accessToken,
    refressToken,
    setAccessToken,
    setRefressToken,
    username,
    setUsername,
  } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/tasks/${id}/`);
        setTask(res.data);
        setTitle(res.data.title);
        setDescription(res.data.description);
        setDueDate(res.data.due_date);
        // const newDate = new Date(res.data.due_date);
        // const ddate = newDate.toISOString();
        // console.log(ddate);
        setStatus(res.data.status);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTask();
  }, [id]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedTask = { title, description, due_date: dueDate, status };
    try {
      const res = await axios.patch(
        `http://127.0.0.1:8000/tasks/${id}/`,
        updatedTask,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      console.log(res.data);
      navigate("/");
      // handle successful update
    } catch (err) {
      console.error(err);
    }
  };

  if (!task) return <div>Loading...</div>;
  return (
    <Box textColor="gray.100">
      <form onSubmit={handleSubmit}>
        <FormControl id="title" mb={4}>
          <FormLabel>Title:</FormLabel>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>

        <FormControl id="description" mb={4}>
          <FormLabel>Description:</FormLabel>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>

        <FormControl id="dueDate" mb={4}>
          <FormLabel>Due Date:</FormLabel>
          <Input
            type="datetime-local"
            value={moment(new Date(dueDate)).format("YYYY-MM-DDTHH:mm:ss")}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </FormControl>

        <FormControl id="status" mb={4}>
          <FormLabel>Status:</FormLabel>
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </Select>
        </FormControl>

        <Button bg="gray.100" textColor="gray.900" type="submit">
          Update
        </Button>
      </form>
    </Box>
  );
}

export default SingleTask;

import React, { useContext, useEffect } from "react";
import {
  Container,
  Box,
  Text,
  Flex,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  HStack,
  Divider,
  IconButton,
  VStack,
  Circle,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spinner,
  Center,
  FormControl,
  FormLabel,
  Select,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { BsPlusLg } from "react-icons/bs";
import { CiLogin } from "react-icons/ci";
import AllTask from "./context/AllTask";

import AuthContext, { AuthContextProvider } from "./globalContext/AuthContext";
import { useState } from "react";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";

function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [allTasks, setAllTasks] = useState(null);
  const [taskAddedNo, setTaskAddedNo] = useState(0);
  const {
    onLoginFormOpen,
    onLoginFormClose,
    isUserLogin,
    setIsUserLogin,
    accessToken,
    refressToken,
    setAccessToken,
    setRefressToken,
    username,
    setUsername,
  } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("pending");
  const toast = useToast();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = { title, description, due_date: dueDate, status };
    try {
      const res = await axios.post("http://127.0.0.1:8000/tasks/", newTask, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log(res.data);
      setTitle("");
      setDescription("");
      setDueDate("");
      setStatus("pending");
      onClose();
      setTaskAddedNo((prev) => prev + 1);
      toast({
        title: `Task Added Succesfully`,
        position: "top-right",
        isClosable: true,
        status: "success",
      });
    } catch (err) {
      console.error(err);
    }
  };
  function againFunctionCallForTaks() {
    setTaskAddedNo((prev) => prev + 1);
  }
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/tasks/")
      .then((data) => data.data)
      .then((data) => setAllTasks(data));
  }, []);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/tasks/")
      .then((data) => data.data)
      .then((data) => setAllTasks(data));
  }, [taskAddedNo]);

  return (
    <>
      <VStack spacing="2">
        {allTasks ? (
          allTasks.map((data, index) => (
            <AllTask
              key={index}
              title={data.title}
              status={data.status}
              id={data.id}
              againFunctionCallForTaks={againFunctionCallForTaks}
            />
          ))
        ) : (
          <center>
            <Spinner size="xl" />
          </center>
        )}
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </FormControl>

              <FormControl id="status" mb={4}>
                <FormLabel>Status:</FormLabel>
                <Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </Select>
              </FormControl>

              <Button colorScheme="blue" onClick={handleSubmit}>
                Create Task
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Home;

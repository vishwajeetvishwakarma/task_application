import {
  Box,
  HStack,
  IconButton,
  ScaleFade,
  SlideFade,
  Square,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { GrUpdate } from "react-icons/gr";
import { AiFillDelete, AiOutlineCheck } from "react-icons/ai";
import AuthContext from "../globalContext/AuthContext";
import axios from "axios";
import { Link as RouterLink, useNavigate } from "react-router-dom";

function AllTask({ title, id, status, againFunctionCallForTaks }) {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const { isUserLogin, accessToken } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <Box
      id={id}
      p="2"
      minW="100%"
      bg="gray.100"
      rounded="lg"
      position="relative"
      onMouseEnter={() => setIsOverlayVisible(true)}
      onMouseLeave={() => setIsOverlayVisible(false)}
      overflow="hidden"
      _hover={{ bg: "yellow.100" }}
      transition="background-color 200ms linear"
      transitionDuration="200"
    >
      <HStack>
        <Square size="40px" bg="yellow.500" rounded="md" color="white">
          {status[0]}
        </Square>
        <h1>{title}</h1>
      </HStack>
      {isOverlayVisible && (
        <SlideFade offsetY="20px" in={isOverlayVisible}>
          <Box
            position="absolute"
            minH="100%"
            minW="100%"
            top="0"
            left="0"
            bg="transparent"
            opacity=".8"
          >
            <HStack justifyContent="center" spacing="2" py="2">
              <IconButton bg="transparent" onClick={() => navigate(`/${id}`)}>
                <GrUpdate />
              </IconButton>
              {isUserLogin && (
                <IconButton
                  bg="transparent"
                  onClick={() => {
                    axios.delete(`http://127.0.0.1:8000/tasks/${id}/`, {
                      headers: { Authorization: `Bearer ${accessToken}` },
                    });
                    againFunctionCallForTaks();
                  }}
                >
                  <AiFillDelete />
                </IconButton>
              )}
              {isUserLogin && (
                <IconButton
                  onClick={() => {
                    axios.patch(
                      `http://127.0.0.1:8000/tasks/${id}/`,
                      { status: "completed" },
                      { headers: { Authorization: `Bearer ${accessToken}` } }
                    );
                    againFunctionCallForTaks();
                  }}
                  bg="transparent"
                >
                  <AiOutlineCheck />
                </IconButton>
              )}
            </HStack>
          </Box>
        </SlideFade>
      )}
    </Box>
  );
}

export default AllTask;

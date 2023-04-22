import React, { useContext } from "react";
import AuthContext from "./globalContext/AuthContext";
import Home from "./home";
import { Route, Routes, Link } from "react-router-dom";
import {
  Box,
  Container,
  Divider,
  Flex,
  Text,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { CiLogin } from "react-icons/ci";
import { BsPlusLg } from "react-icons/bs";
import SingleTask from "./SingleTask";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    onLoginFormOpen,
    isUserLogin,
    setIsUserLogin,
    setAccessToken,
    setRefressToken,
    username,
    setUsername,
  } = useContext(AuthContext);
  return (
    <>
      <Box minH="100vh" bgGradient="linear(to-l, gray.700, black)" padding="4">
        <Flex justifyContent="center">
          <Container
            maxW="2xl"
            paddingY="4"
            backgroundColor="yellow.500"
            borderRadius="md"
            boxShadow="2xl"
            position="relative"
          >
            <HStack justifyContent="space-between">
              <Link to={"/"}>
                <Text fontSize="3xl" fontWeight="bold" textColor="gray.100">
                  All Task
                </Text>
              </Link>
              <HStack>
                {isUserLogin ? (
                  <>
                    <Menu>
                      <MenuButton as={Button}>{username[0]}</MenuButton>
                      <MenuList>
                        <MenuItem>Change Password</MenuItem>
                        <MenuItem
                          onClick={() => {
                            setIsUserLogin(false);
                            setUsername("");
                            setAccessToken("");
                            setRefressToken("");
                          }}
                        >
                          Logout
                        </MenuItem>
                      </MenuList>
                    </Menu>
                    <IconButton onClick={onOpen} icon={<BsPlusLg />} />
                  </>
                ) : (
                  <IconButton onClick={onLoginFormOpen} icon={<CiLogin />} />
                )}
              </HStack>
            </HStack>
            <Divider m="2" />
            <Routes>
              <Route path="/" index element={<Home />} />
              <Route path="/:id" element={<SingleTask />} />
            </Routes>
          </Container>
        </Flex>
      </Box>
    </>
  );
}

export default App;

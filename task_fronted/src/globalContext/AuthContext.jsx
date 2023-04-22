import { createContext, useContext, useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  ModalCloseButton,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Link,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState("");
  const [refressToken, setRefressToken] = useState("");
  const [isUserLogin, setIsUserLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const {
    isOpen: isLoginFormOpen,
    onOpen: onLoginFormOpen,
    onClose: onLoginFormClose,
  } = useDisclosure({ defaultIsOpen: !isUserLogin });
  const navigate = useNavigate();
  async function handleSubmit(event) {
    event.preventDefault();
    console.log(username, password);
    axios
      .post("http://localhost:8000/auth/token/", {
        username,
        password,
      })
      .then((data) => data.data)
      .then((data) => {
        setAccessToken(data["access"]);
        setRefressToken(data["refresh"]);
        setPassword("");
        setIsUserLogin(true);
        toast({
          title: ` Hello User ${username}, you successfully Login `,
          position: "top-right",
          isClosable: true,
          status: "success",
        });
      })
      .catch((e) => {
        toast({
          title: ` Provided Credential are not correct `,
          position: "top-right",
          isClosable: true,
          status: "error",
        });
      });

    onLoginFormClose();
  }
  return (
    <>
      <AuthContext.Provider
        value={{
          isLoginFormOpen,
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
        }}
      >
        {children}
      </AuthContext.Provider>
      <Modal isOpen={isLoginFormOpen} onClose={onLoginFormClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textColor="yellow.500" fontSize="3xl">
            Login
          </ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <Stack spacing={4}>
                <FormControl id="username">
                  <FormLabel>User Name</FormLabel>
                  <Input
                    type="text"
                    value={username}
                    id="username"
                    onChange={(event) => setUsername(event.target.value)}
                  />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </FormControl>
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  >
                    <Checkbox>Remember me</Checkbox>
                    <Link color={"blue.400"}>Forgot password?</Link>
                  </Stack>
                </Stack>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="yellow" mr={3} type="submit">
                Login
              </Button>
              <Button onClick={onLoginFormClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AuthContext;

// function LoginModal({ onClose }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { isOpen } = useContext(ModalContext);

//   function handleSubmit(event) {
//     event.preventDefault();
//     // Your login form submission logic here
//     onClose();
//   }

//   return (
//     <Modal isOpen={isOpen} onClose={onClose}>
//       <ModalOverlay />
//       <ModalContent>
//         <ModalHeader>Login</ModalHeader>
//         <ModalCloseButton />
//         <form onSubmit={handleSubmit}>
//           <ModalBody>
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(event) => setEmail(event.target.value)}
//             />
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(event) => setPassword(event.target.value)}
//             />
//           </ModalBody>

//           <ModalFooter>
//             <Button colorScheme="blue" mr={3} type="submit">
//               Login
//             </Button>
//             <Button onClick={onClose}>Cancel</Button>
//           </ModalFooter>
//         </form>
//       </ModalContent>
//     </Modal>
//   );
// }

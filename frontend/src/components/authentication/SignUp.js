import React, { useState } from "react";
import {
  VStack,
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";

const SignUp = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState();
  const [show, setShow] = useState(false);
  const handleShowButton = () => setShow(!show);
  const postPicture = (pic) => {};
  const submitHandler = () => {};
  return (
    <VStack spacing={4} color="black">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter your name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></Input>
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></Input>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter your password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></Input>
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleShowButton}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <Input
          type="password"
          placeholder="Confirm your password"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        ></Input>
      </FormControl>
      <FormControl id="pic" isRequired>
        <FormLabel>Upload your Profile Photo</FormLabel>
        <Input
          type="file"
          p="1.5"
          placeholder="image/*"
          onChange={(e) => {
            postPicture(e.target.files[0]);
          }}
        ></Input>
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default SignUp;

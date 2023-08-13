import React from "react";
import {
  Box,
  Container,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import Login from "../components/authentication/Login";
import SignUp from "../components/authentication/SignUp";

const Homepage = () => {
  return (
    <Container maxW="xl">
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        textAlign="center"
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="md"
        borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="Work Sans" color="black">
          Chat Application
        </Text>
      </Box>
      <Box
        p={3}
        bg={"white"}
        w="100%"
        borderRadius="md"
        borderWidth="1px"
        textColor="black"
      >
        <Tabs variant="soft-rounded">
          <TabList>
            <Tab width="50%">Login</Tab>
            <Tab width="50%">SignUp</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Homepage;

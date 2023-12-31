import React, { useEffect } from "react";
import { ChatState } from "../../context/ChatProvider";
import { useToast } from "@chakra-ui/toast";
import { AddIcon } from "@chakra-ui/icons";
import { useState } from "react";
import axios from "axios";
import { Stack } from "@chakra-ui/layout";
import { Box, Text, Button } from "@chakra-ui/react";
import ChatLoading from "./ChatLoading";
import { getSender } from "../../helper/ChatLogic";
import GroupChatModal from "./GroupChatModal";
const MyChats = ({ fetchAgain }) => {
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  //initializing the loggedUser with dummy id, so that when we call getSender(line 101), we dont run into undefined user
  //as useEffect will be parsing the user(till that time user will be undefined)
  const [loggedUser, setLoggedUser] = useState({ _id: -1 });
  const toast = useToast();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("/api/chats", config);
      console.log(data);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);
  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <GroupChatModal>
          <Button
            display="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text style={{ fontSize: 20 }}>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
                <Text
                  style={
                    selectedChat !== chat
                      ? { color: "rgb(90, 90, 90)" }
                      : { color: "white" }
                  }
                >
                  {(chat?.isGroupChat
                    ? `${chat?.latestMessage.sender.name} :`
                    : "") + `${chat?.latestMessage.content}`}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;

import React, { useEffect } from "react";
import { ChatState } from "../../context/ChatProvider";
import { Box, FormControl, Spinner, Text, useToast } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender } from "../../helper/ChatLogic";
import { getSenderUser } from "../../helper/ChatLogic";
import ProfileModal from "./ProfileModal";
import UpdateGroupChatModal from "./UpdateGroupChatModal";
import { useState } from "react";
import { Input } from "@chakra-ui/react";
import axios from "axios";
import ScrollableChat from "./ScrollableChat";
import "./styles.css";
import io from "socket.io-client";
import Lottie from "react-lottie";
import animationData from "../../animations/typing.json";
import { updateNotificationSeenBy } from "../helpers/helper";

const ENDPOINT = "http://localhost:5000";
var socket, recentSelectedChat, timer;
const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat, notification, setNotification } =
    ChatState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const [senderTyping, setSenderTyping] = useState(false);
  const toast = useToast();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `/api/messages/${selectedChat._id}`,
        config
      );

      setMessages(data);
      setLoading(false);
      socket.emit("join chat", selectedChat._id);
    } catch (error) {}
  };
  useEffect(() => {
    socket = io(ENDPOINT);
    console.log(socket);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setSenderTyping(true));
    socket.on("stop typing", () => setSenderTyping(false));
  }, []);

  useEffect(() => {
    fetchMessages();
    recentSelectedChat = selectedChat;
    console.log(selectedChat);
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !recentSelectedChat ||
        recentSelectedChat._id !== newMessageReceived.chat._id
      ) {
        // notification
        setNotification([newMessageReceived, ...notification]);
        // As new messages are received, so a re-render of component would be required, fetching new messages
        setFetchAgain(!setFetchAgain);
      } else {
        console.log(newMessageReceived);
        const notificationReceived = { _id: newMessageReceived.notificationId };
        delete newMessageReceived.notificationId;
        setMessages([...messages, newMessageReceived]);
        console.log(notificationReceived);
        //remove the current user from notification's notificationNotSeenBy from db as user is already on the chat
        //no need to wait for request to be completed
        updateNotificationSeenBy(notificationReceived, user.token);
      }
    });
  }, []);
  const getUsersListForNotifying = () => {
    return selectedChat.users.filter((ele) => ele._id !== user._id);
  };
  const sendMessage = async (event) => {
    if (event.key !== "Enter" || !newMessage) return;
    socket.emit("stop typing", selectedChat._id);

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      setNewMessage("");

      const [notificationResponse, messageResponse] = await Promise.all([
        axios.post(
          "/api/notification",
          {
            chat: selectedChat._id,
            notificationNotSeenBy: JSON.stringify(getUsersListForNotifying()),
          },
          config
        ),
        axios.post(
          "/api/messages",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        ),
      ]);
      const messageData = messageResponse.data;
      const notificationData = notificationResponse.data;
      setMessages([...messages, messageData]);
      const messageSendToSocket = { ...messageData };
      messageSendToSocket.notificationId = notificationData._id;
      console.log(messageSendToSocket);
      socket.emit("new message", messageSendToSocket);
      setUserTyping(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    if (!socketConnected) return;
    if (!userTyping) {
      setUserTyping(true);
      socket.emit("typing", selectedChat._id);
    }

    if (timer) clearTimeout(timer);
    var timerLength = 3000;
    timer = setTimeout(() => {
      socket.emit("stop typing", selectedChat._id);
      setUserTyping(false);
    }, timerLength);
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModal user={getSenderUser(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat.chatName}
                {
                  <UpdateGroupChatModal
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                    fetchMessages={fetchMessages}
                  />
                }
              </>
            )}
          </Text>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                {<ScrollableChat messages={messages} />}
              </div>
            )}
            {senderTyping ? (
              <div>
                <Lottie
                  options={defaultOptions}
                  width={50}
                  style={{ marginBottom: 15, marginLeft: 0 }}
                />
              </div>
            ) : (
              <></>
            )}
            <div>
              <FormControl onKeyDown={sendMessage} isRequired mt={3}>
                <Input
                  variant="filled"
                  bg="#E0E0E0"
                  placeholder="Type to chat"
                  onChange={typingHandler}
                  value={newMessage}
                />
              </FormControl>
            </div>
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;

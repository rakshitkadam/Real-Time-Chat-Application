import React from "react";
import { Box } from "@chakra-ui/layout";
import { ChatState } from "../context/ChatProvider";
import MyChats from "../components/miscellenous/MyChats";
import ChatBox from "../components/miscellenous/ChatBox";
import SideDrawer from "../components/miscellenous/SideDrawer";
import { useState } from "react";
const ChatsPage = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);
  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default ChatsPage;

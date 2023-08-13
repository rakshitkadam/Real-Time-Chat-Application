import React, { useEffect, useState } from "react";
import axios from "axios";
const ChatsPage = () => {
  const [chats, setchats] = useState([]);

  const fetchChats = async () => {
    const { data } = await axios.get("/api/chats");
    setchats(data);
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div>
      {chats.map((chat) => (
        <div>{chat.chat}</div>
      ))}
    </div>
  );
};

export default ChatsPage;

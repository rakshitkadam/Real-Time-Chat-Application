export const getSender = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};

export const getSenderUser = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};

export const isSameSender = (messages, currentMessage, i, userId) => {
  return (
    i < messages.length - 1 &&
    currentMessage.sender._id !== userId &&
    messages[i + 1].sender._id !== currentMessage.sender._id
  );
};

export const isLastMessage = (messages, i, userId) => {
  return i === messages.length - 1 && messages[i].sender._id !== userId;
};

export const isSameUser = (messages, currentMessage, i) => {
  return i > 0 && messages[i - 1].sender._id === currentMessage.sender._id;
};

export const isSameSenderMargin = (messages, currentMessage, i, userId) => {
  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === currentMessage.sender._id &&
    messages[i].sender._id !== userId
  )
    return 33;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== currentMessage.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  )
    return 0;
  else return "auto";
};

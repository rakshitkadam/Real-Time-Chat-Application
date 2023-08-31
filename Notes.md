My Notes :

1) Note that in the SingleChat.js, we have two useEffects, one to fetchMessages whenever the selectedChat is changed and other useEffect
to do the socket setup with client.

2) Sockets in context of this project : The way the sockets work is, their are two parts: client and server:
    a) client will establish a connection with server (socket).
    b) After connection, we perform the setup where server will join a specific room(which is clients user._id). Note that for performing
   any of the action like joining a room, leaving a room, server will do it on behalf of a client.
    c) On clicking on any of the chats, the client sents the event to join the chat to server,  This can be done by say, client emits the
   event {"Join Chat",chatId} and server listens the event and takes the action(socket.join(room); here room=chatId). You can consider 
   socket as 1:1 mappping of client with server, so if two clients are present, so two sockets would be present(client1:backend , client2: 
   backend).Although the backend has only one instance running, but it will have two different sockets. The code on backend is responsible 
   to connect the socket to a specific room

   * In backend, we joined the socket to room which is user._id, so that whenenver other user sends a message, the frontend will emit the
     event {"new message", newMessage} and then backend will listen that, and send it to all users in the group via event {"messsage 
     received", newMessasge}. When backend emits this event, the frontend listens this event, and on the basis of whether the chat is 
     selected by user or not, it will either instantly show the message in chat or (show notification and fetch all the messages in that 
     chat). Saying again the sockets is between client and server.
     

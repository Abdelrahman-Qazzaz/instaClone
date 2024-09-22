// make sure to try to keep the sockets strictly for improving user experience as much as possible, cuz you dont wanna mess up the postman stuff
let connectedUsers = [];
io.on("connection", (socket) => {
  //emit: broadcast to all users.

  if (socket.recovered) {
  }
  socket.on("auth", (user_id) => {
    const socketID = socket.id;
    connectedUsers.push({ socketID, user_id });
  });

  socket.on("userEnteredChat", (chat_id) => {
    const socketID = socket.id;
    const targetUser = connectedUsers.find(
      (connectedUser) => connectedUser.socketID == socketID
    );
    if (targetUser) {
      const filteredConnectedUsers = connectedUsers.filter(
        (connectedUser) => connectedUser.socketID != socketID
      );

      targetUser.inChatWith_id = chat_id;
      connectedUsers = [...filteredConnectedUsers, targetUser];
    }
  });

  socket.on("exittedChat", () => {
    const filteredArray = connectedUsers.filter(
      (connectedUser) => connectedUser.socketID != socket.id
    );
    const user = connectedUsers.find(
      (connectedUser) => connectedUser.socketID == socket.id
    );
    if (user) {
      user.inChatWith_id = null;
      connectedUsers = [...filteredArray, user];
    }
  });

  socket.on("messageSent", async (chat_id) => {
    const Chats = db.collection("Chats");
    const filter = { _id: ObjectId.createFromHexString(chat_id) };
    const targetChat = await Chats.findOne(filter);
    const user1_id = targetChat.user1_id;
    const user2_id = targetChat.user2_id;

    let sendingUser = connectedUsers.find(
      (connectedUser) => connectedUser.socketID == socket.id
    );
    let recievingUser_id;
    const temp = sendingUser.user_id;

    if (user1_id + "" == temp) {
      recievingUser_id = user2_id;
    } else if (user2_id + "" == temp) {
      recievingUser_id = user1_id;
    } else {
      //we're in trouble
    }

    recievingUser_id = recievingUser_id + ""; //string
    let recievingUserIsOnline = connectedUsers.find(
      (connectedUser) => connectedUser.user_id == recievingUser_id
    )
      ? true
      : false;

    const recievingUser = connectedUsers.find(
      (connectedUser) => connectedUser.user_id == recievingUser_id
    );
    const recievingUserSocketID = recievingUser ? recievingUser.socketID : null;

    if (
      recievingUserIsOnline &&
      recievingUser &&
      recievingUser.inChatWith_id == targetChat._id.toString()
    ) {
      // online and in that chat
      io.to(recievingUserSocketID).emit("refetchThisChat");
    } else {
      // not in that chat, either online or offline
      const Users = db.collection("Users");
      const filter = { _id: ObjectId.createFromHexString(recievingUser_id) };

      try {
        sendingUser = await Users.findOne({
          _id: ObjectId.createFromHexString(sendingUser.user_id),
        });
        const update = {
          $push: {
            notifications: {
              type: "chat",
              _id: targetChat._id,
              content: `${sendingUser.username} sent you a message.`,
            },
          },
        };
        await Users.updateOne(filter, update);
      } catch (error) {
        console.log(error);
      }

      //

      if (recievingUserIsOnline) {
        // online but not in that chat
        io.to(recievingUserSocketID).emit("refetchUser");
      }
    }
  });

  socket.on("disconnect", () => {
    connectedUsers = connectedUsers.filter(
      (connectedUser) => connectedUser.socketID != socket.id
    );
  });
});

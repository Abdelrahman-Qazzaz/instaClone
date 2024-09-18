import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import env from "dotenv";
import http from "http";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import multer from "multer";
import { Server } from "socket.io";
import { checkAuth, login } from "./auth.js";
import { db } from "./db.js";
import { usersRouter } from "./routers/router.users.js";
import { postsRouter } from "./routers/router.posts.js";
import { chatsRouter } from "./routers/router.chats.js";

env.config();

export const upload = multer({ dest: "uploads/" });

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 4000;

app.use(
  cors({
    origin: ["https://instaclone-1-jckm.onrender.com", "http://localhost:3000"],
    credentials: true,
  })
);

app.use(bodyParser.json({ limit: "70mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(checkAuth);

app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/chats", chatsRouter);

app.post("/login", login);
app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      res.sendStatus(500);
    }
    res.sendStatus(200);
  });
});

app.get("/", (req, res) => {
  //this route is skipped for auth, so we will do it manually here.
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.json({ user_id: -1 }); // Unauthorized

  jwt.verify(token, process.env.SECRETWORD, (err, user) => {
    if (err) {
      return res.json({ user_id: -1 });
    } // Forbidden
    res.json({ user_id: user._id });
  });
});

app.get("/:username", async (req, res) => {
  const Users = db.collection("Users");
  const filter = { username: req.params.username };
  const targetUser = await Users.findOne(filter);
  if (targetUser) {
    res.redirect(`/users/${targetUser._id}`);
  } else {
    res.sendStatus(404);
  }
});

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

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import http from "http";
import multer from "multer";
import { Server } from "socket.io";
import { authRouter } from "./routers/router.auth.ts";
import { usersRouter } from "./routers/router.users.ts";
import { postsRouter } from "./routers/posts/router.posts.ts";
import { chatsRouter } from "./routers/router.chats.ts";
import { checkAuth } from "./middleware/checkAuth.ts";

export const upload = multer({ dest: "uploads/" });

const app = express();
const server = http.createServer(app);
export const io = new Server(server);
const port = process.env.PORT || 4000;

app.use(
  cors({
    origin: ["https://instaclone-1-jckm.onrender.com", "http://localhost:3000"],
    credentials: true,
  })
);

app.use(bodyParser.json({ limit: "70mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/posts", postsRouter);
// app.use("/chats", chatsRouter);

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

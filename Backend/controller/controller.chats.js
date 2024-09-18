import { ObjectId } from "mongodb";
import { db } from "../db.js";

export async function getById(req, res) {
  try {
    const Chats = db.collection("Chats");

    const filter = { _id: ObjectId.createFromHexString(req.params.chat_id) };
    const targetChat = await Chats.findOne(filter);
    if (
      req.user._id == targetChat.user1_id ||
      req.user._id == targetChat.user2_id
    ) {
      const Users = db.collection("Users");
      targetChat.user1 = await Users.findOne({ _id: targetChat.user1_id });
      targetChat.user2 = await Users.findOne({ _id: targetChat.user2_id });

      res.json({ targetChat });
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function createChat(req, res) {
  const Chats = db.collection("Chats");
  const { user1_id, user2_id } = req.body;
  const targetChat = await Chats.findOne({
    user1_id: ObjectId.createFromHexString(user1_id),
    user2_id: ObjectId.createFromHexString(user2_id),
  });
  if (targetChat) {
    res.json({ targetChat }); //resource already exists
  } else {
    const { insertedId } = await Chats.insertOne({
      user1_id: ObjectId.createFromHexString(user1_id),
      user2_id: ObjectId.createFromHexString(user2_id),
    });
    const Users = db.collection("Users");
    const filter = {
      $or: [
        { _id: ObjectId.createFromHexString(user1_id) },
        { _id: ObjectId.createFromHexString(user2_id) },
      ],
    };

    const update = { $push: { chats_ids: insertedId } };
    await Users.updateMany(filter, update);
    res.status(201).json({ chat_id: insertedId });
  }
}

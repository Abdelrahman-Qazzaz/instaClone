import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { db } from "../db.js";
export async function getById(req, res) {
  // auth is skipped here, so it's done manually
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    let decoded = null;
    if (token != null) {
      decoded = jwt.verify(token, process.env.SECRETWORD);
    }

    if (decoded && decoded._id == req.params.userID) {
      // get user's own data  //chekcing for req.user because some axios requests are sent to this route without credintials.
      const userObjectId = ObjectId.createFromHexString(decoded._id);
      let user = await getUserData(userObjectId, true, true, true);
      user._id = req.user._id;
      return res.json({ user });
    } else {
      // get some other user's data (for example for visiting their profile page)

      const targetUserObjectId = ObjectId.createFromHexString(
        req.params.userID
      );
      let targetUser = await getUserData(
        targetUserObjectId,
        false,
        true,
        false
      );
      targetUser.password = "";
      return res.json({ targetUser });
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function getStory(req, res) {
  const Users = db.collection("Users");
  const filter = { username: req.params?.username };
  const { story } = await Users.findOne(filter);
  return res.status(200).json({ story });
}

export async function updateStorySlideViews(req, res) {
  try {
    const Users = db.collection("Users");
    const filter = { username: req?.params?.username };
    const targetUser = await Users.findOne(filter);
    const targetUserStory = targetUser?.story;
    const filteredSlides = targetUserStory?.slides?.filter(
      (slide) => slide.id != req.params.slideID
    );
    const targetSlide = targetUserStory?.slides?.find(
      (slide) => slide.id == req.params?.slideID
    );
    if (!targetSlide?.views) {
      targetSlide.views = [];
    }
    targetSlide.views.push({
      user_id: ObjectId.createFromHexString(req.user._id),
    });
    const newSlides = [...filteredSlides, targetSlide];
    const update = { $set: { story: { slides: newSlides } } };
    await Users.updateOne(filter, update);
    const { story } = await Users.findOne(filter);
    return res.status(200).json({ story });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function followUser(req, res) {
  if (req.user && req.user._id === req.params.userID) {
    const { targetID } = req.body;

    try {
      const Users = db.collection("Users");
      let filter = { _id: ObjectId.createFromHexString(req.user._id) };
      let update = {
        $push: { following_ids: ObjectId.createFromHexString(targetID) },
      };
      await Users.updateOne(filter, update);

      filter = { _id: ObjectId.createFromHexString(targetID) };
      update = {
        $push: { followedBy_ids: ObjectId.createFromHexString(req.user._id) },
      };
      await Users.updateOne(filter, update);

      return res.sendStatus(200);
    } catch (err) {
      return res.status(500).json({ err: err });
    }
  } else {
    return res.sendStatus(401);
  }
}
export async function unfollowUser(req, res) {
  if (req.user._id == req.params.user_id) {
    try {
      const Users = db.collection("Users");
      let filter = { _id: ObjectId.createFromHexString(req.user._id) };
      let update = {
        $pull: {
          following_ids: ObjectId.createFromHexString(req.params.targetUser_id),
        },
      };
      await Users.updateOne(filter, update);
      filter = { _id: ObjectId.createFromHexString(req.params.targetUser_id) };
      update = {
        $pull: { followedBy_ids: ObjectId.createFromHexString(req.user._id) },
      };
      await Users.updateOne(filter, update);
      return res.sendStatus(204);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  } else {
    return res.sendStatus(401);
  }
}

export async function getFollowing(req, res) {
  if (req.params.user_id == req.user._id) {
    const Users = db.collection("Users");
    const filter = { _id: ObjectId.createFromHexString(req.user._id) };
    const targetUser = await Users.findOne(filter);
    targetUser.following = [];
    if (targetUser) {
      for (const following_id of targetUser.following_ids) {
        const following = await Users.findOne({ _id: following_id });
        targetUser.following.push(following);
      }
      return res.json({
        following: targetUser.following,
        following_ids: targetUser.following_ids,
      });
    } else {
      return res.sendStatus(500);
    }
  } else {
    return res.sendStatus(401);
  }
}

export async function createUser(req, res) {
  const user = req.body;
  const users = db.collection("Users");
  user.following_ids = []; //array of strings
  user.followedBy_ids = []; //array of strings
  user.posts_ids = []; //array of strings
  user.chats_ids = []; //array of strings
  user.savedPosts_ids = [];
  user.password = await hash(req.body.password);
  await users.insertOne(user);
  return res.sendStatus(201);
}

export async function saveUnsavePost(req, res) {
  if (req.user._id == req.params.user_id) {
    try {
      const { targetPost_id } = req.body;
      const Users = db.collection("Users");
      let filter = { _id: ObjectId.createFromHexString(req.user._id) };
      const targetUser = await Users.findOne(filter);
      if (!targetUser.savedPosts_ids) {
        targetUser.savedPosts_ids = [];
      }
      const userHasThisPostSaved = targetUser.savedPosts_ids.find(
        (post_id) => post_id + "" == targetPost_id
      )
        ? true
        : false;

      let update;
      if (userHasThisPostSaved) {
        filter = { _id: ObjectId.createFromHexString(targetPost_id) };
        update = { $pull: { savedPosts_ids: filter._id } };
      } else {
        update = {
          $push: {
            savedPosts_ids: ObjectId.createFromHexString(targetPost_id),
          },
        };
      }
      filter = { _id: ObjectId.createFromHexString(req.user._id) };
      await Users.updateOne(filter, update);
      const { savedPosts_ids } = await Users.findOne(filter);
      return res.status(200).json({ savedPosts_ids });
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  } else {
    return res.sendStatus(401);
  }
}

export async function fetchSuggestions(req, res) {
  if (req.query && req.query.input) {
    const sanitizedInput = validator.escape(req.query.input);
    const Users = db.collection("Users");
    const filter = { username: { $regex: "^" + sanitizedInput } };
    const cursor = Users.find(filter);
    const users = await cursor.toArray();
    for (const user of users) {
      user.password = "";
    }
    return res.status(200).json({ users });
  }
  try {
    const Users = db.collection("Users");
    const pipeline = [
      {
        $group: {
          _id: "$_id",
          originalDoc: { $first: "$$ROOT" },
          followedBy_ids: { $push: "$followedBy_ids" },
        },
      },
      {
        $sort: { "followedBy_ids.length": -1 }, // Sort by followedBy_ids array length (descending)
      },
      {
        $match: {
          _id: { $ne: ObjectId.createFromHexString(req.user._id) },
        },
      },
    ];

    const cursor = Users.aggregate(pipeline);
    const temp = await cursor.toArray();

    const user = await Users.findOne({
      _id: ObjectId.createFromHexString(req.user._id),
    });
    let documents = [];
    for (const document of temp) {
      if (
        !user.following_ids.find(
          (following_id) => following_id + "" == document.originalDoc._id + ""
        )
      ) {
        documents.push(document.originalDoc);
      }
    }
    for (const document of documents) {
      document.password = "";
    }
    return res.status(200).json({ suggested_users: documents });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Error: err });
  }
}

export async function deletePFP(req, res) {
  const user_id = req.params._id;
  console.log("user_id");
  console.log(user_id);
  const Users = db.collection("Users");
  const filter = { _id: ObjectId.createFromHexString(user_id) };
  const update = { $unset: { pfpFirebasePathURL: 1 } };
  try {
    await Users.updateOne(filter, update);
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
}

async function getUserData(
  user_id,
  getFollowingsData,
  getPostsData,
  getFollowingsPosts
) {
  const Users = db.collection("Users");
  const filter = { _id: user_id };
  const targetUser = await Users.findOne(filter);
  if (getFollowingsData) {
    targetUser.following = [];
    for (const following_id of targetUser.following_ids) {
      const temp = await getUserData(following_id, false, false);
      targetUser.following.push(temp);
    }
  }
  if (getFollowingsPosts) {
    for (const following of targetUser.following) {
      following.posts = [];
      for (const post_id of following.posts_ids) {
        const post = await getPostData(post_id);
        following.posts.push(post);
      }
    }
  }
  if (getPostsData) {
    targetUser.posts = [];
    for (const post_id of targetUser.posts_ids) {
      const temp = await getPostData(post_id);
      targetUser.posts.push(temp);
    }
  }
  targetUser.password = "";
  return targetUser;
}

async function getPostData(post_id) {
  const Posts = db.collection("Posts");
  const filter = { _id: post_id };
  const targetPost = await Posts.findOne(filter);
  return targetPost;
}

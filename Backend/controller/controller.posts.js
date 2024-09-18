import { ObjectId } from "mongodb";
import { db } from "../db.js";

export async function getById(req, res) {
  try {
    const Posts = db.collection("Posts");
    const post_id = req.params.post_id;
    const post_ObjectId = ObjectId.createFromHexString(post_id);
    const filter = { _id: post_ObjectId };
    const targetPost = await Posts.findOne(filter);
    if (targetPost.comments) {
      targetPost.comments.sort((a, b) => b.creationDate - a.creationDate);
      for (const comment of targetPost.comments) {
        if (comment.replies) {
          comment.replies.sort((a, b) => b.creationDate - a.creationDate);
        }
      }
    }

    return res.status(200).json({ targetPost });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function likeUnlike(req, res) {
  try {
    const userObjectID = ObjectId.createFromHexString(req.user._id);

    const Users = db.collection("Users");
    let filter = { _id: userObjectID };
    const user = await Users.findOne(filter);

    const Posts = db.collection("Posts");
    const postObjectID = ObjectId.createFromHexString(req.params.post_id);
    filter = { _id: postObjectID };
    const targetPost = await Posts.findOne(filter);

    if (!targetPost.likes) {
      targetPost.likes = [];
    }
    const otherLikesForThisPost = targetPost.likes.filter(
      (like) => like.byUser_id != req.user._id
    );
    const userLikedThisPost = targetPost.likes.find(
      (like) => like.byUser_id == req.user._id
    )
      ? true
      : false; //boolean
    let newLikes;
    if (userLikedThisPost) {
      newLikes = [...otherLikesForThisPost];
    } else {
      newLikes = [...otherLikesForThisPost, { byUser_id: req.user._id }];
    }
    const update = { $set: { likes: newLikes } };
    await Posts.updateOne(filter, update);
    return res.status(200).json({ newLikesForPost: newLikes });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function addComment(req, res) {
  try {
    const Users = db.collection("Users");
    const Posts = db.collection("Posts");
    const filter = { _id: ObjectId.createFromHexString(req.params.post_id) };
    const targetDocument = await Posts.findOne(filter);
    const numOfComments = targetDocument.comments
      ? targetDocument.comments.length
      : 0;
    const { comment } = req.body;
    const owner = await Users.findOne({
      _id: ObjectId.createFromHexString(req.user._id),
    });
    const update = {
      $push: {
        comments: {
          id: numOfComments + "",
          content: comment,
          owner: owner,
          creationDate: Date.now(),
          replies: [],
        },
      },
    };
    const result = await Posts.updateOne(filter, update);

    return res.status(201).json({
      newComment: {
        id: numOfComments + "",
        content: comment,
        owner: owner,
        creationDate: Date.now(),
        replies: [],
      },
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
export async function commentLikeunLike(req, res) {
  const Posts = db.collection("Posts");
  const filter = { _id: ObjectId.createFromHexString(req.params.post_id) };
  const targetDocument = await Posts.findOne(filter);
  const targetComment = targetDocument.comments.find(
    (comment) => comment.id == req.params.commentID
  );
  const otherComments = targetDocument.comments.filter(
    (comment) => comment.id != req.params.commentID
  );

  if (!targetComment.likes) {
    targetComment.likes = [];
  }
  let userLikedComment = targetComment.likes.find(
    (like) => like.byUser_id == req.user._id
  );
  if (userLikedComment) {
    const temp = targetComment.likes.filter(
      (like) => like.byUser_id != req.user._id
    );
    targetComment.likes = temp;
  } else {
    targetComment.likes.push({ byUser_id: req.user._id });
  }
  const newComments = [...otherComments, targetComment];
  const update = { $set: { comments: newComments } };
  await Posts.updateOne(filter, update);
  newComments.sort((a, b) => b.creationDate - a.creationDate);
  return res.status(200).json({ newLikesForComment: newComments });
}

export async function replyLikeunLike(req, res) {
  const Posts = db.collection("Posts");
  const filter = { _id: ObjectId.createFromHexString(req.params.post_id) };
  const targetDocument = await Posts.findOne(filter);
  const targetComment = targetDocument.comments.find(
    (comment) => comment.id == req.params.commentID
  );
  const otherComments = targetDocument.comments.filter(
    (comment) => comment.id != req.params.commentID
  );
  const targetReply = targetComment.replies.find(
    (reply) => reply.id == req.params.replyID
  );
  const otherReplies = targetComment.replies.filter(
    (reply) => reply.id != req.params.replyID
  );

  if (!targetReply.likes) {
    targetReply.likes = [];
  }
  let userLikedReply = targetReply.likes.find(
    (like) => like.byUser_id == req.user._id
  );
  let newReplies;
  if (userLikedReply) {
    const temp = targetReply.likes.filter(
      (like) => like.byUser_id != req.user._id
    );
    targetReply.likes = temp;
  } else {
    targetReply.likes.push({ byUser_id: req.user._id });
  }
  newReplies = [...otherReplies, targetReply];
  targetComment.replies = newReplies;

  const newComments = [...otherComments, targetComment];
  const update = { $set: { comments: newComments } };
  await Posts.updateOne(filter, update);
  newComments.sort((a, b) => b.creationDate - a.creationDate);
  return res.status(200).json({ newLikesForComment: newComments });
}

export async function fypGetPosts(req, res) {
  // 1 page = 10 posts
  const Users = db.collection("Users");
  const Posts = db.collection("Posts");
  const feed_posts = [];
  let filter = { _id: ObjectId.createFromHexString(req.user._id) };
  const user = await Users.findOne(filter);
  for (const following_id of user.following_ids) {
    filter = { _id: following_id };
    const following = await Users.findOne(filter);
    for (const post_id of following.posts_ids) {
      filter = { _id: post_id };
      const post = await Posts.findOne(filter);
      if (post) {
        feed_posts.push(post);
      }
    }
  }
  feed_posts.sort((a, b) => b.creationDate - a.creationDate);
  return res.json({ feedPosts: feed_posts });
}

export async function fetchSuggestions(req, res) {
  // explore page
  try {
    const Posts = db.collection("Posts");
    const suggestedPosts = await Posts.find().toArray();
    return res.json({ suggestedPosts });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function addReplyToComment(req, res) {
  try {
    const { reply } = req.body;
    const Posts = db.collection("Posts");
    const Users = db.collection("Users");
    const filter = { _id: ObjectId.createFromHexString(req.params.post_id) };
    const targetDocument = await Posts.findOne(filter);

    const filteredCommentsArray = targetDocument.comments.filter(
      (comment) => comment.id != req.params.commentId
    ); // returns the comments to the post, excluding the comment which got replied to.
    const targetComment = targetDocument.comments.find(
      (comment) => comment.id == req.params.commentId
    ); //find target comment.
    const owner = await Users.findOne({
      _id: ObjectId.createFromHexString(req.user._id),
    });
    targetComment.replies.push({
      id: targetComment.replies ? targetComment.replies.length + "" : "0",
      content: reply,
      owner,
      creationDate: Date.now(),
    });
    const newComments = [...filteredCommentsArray, targetComment];
    const update = { $set: { comments: newComments } };
    await Posts.updateOne(filter, update);
    return res.status(201).json({ newComments });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

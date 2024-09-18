import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

import { localStorageGetItem, localStorageSetItem } from "./LocalStorage";

const userContext = createContext();

export function UserContextProvider({ children, ...props }) {
  const fiveminsInMS = 1000 * 60 * 5;
  const socket = props.socket;
  const isLoading = props.isLoading;
  const setIsLoading = props.setIsLoading;
  const [user, setUser] = useState({ _id: -1 }); // immer
  const [token, setToken] = useState(null);
  const [config, setConfig] = useState(null);
  const [showBlackBackGround, setShowBlackBackground] = useState(false);
  const [showSuggestedPage, setShowSuggestedPage] = useState();
  const [showSwitchScreen, setShowSwitchScreen] = useState(false);
  const [showCreateNewPostScreen, setShowCreateNewPostScreen] = useState(false);
  const [showSharePostScreen, setShowSharePostScreen] = useState(false);
  const [showUnfollowConfirmationScreen, setShowUnfollowConfirmationScreen] =
    useState(false);
  const [
    unfollowConfirmationScreenTargetUser,
    setUnfollowConfirmationScreenTargetUser,
  ] = useState();
  const [sharePostScreenPostData, setSharePostScreenPostData] = useState();

  useEffect(() => {
    if (localStorage.getItem("config")) {
      setConfig(JSON.parse(localStorage.getItem("config")));
    }
    // will be useful for two cases: 1.if user logged in, then closed the website, then opened it again. 2. if the user refreshes the browser, cuz it will prevent the user from having to re login... PS: dont do this in any other place, even if it says cant read properties of undefined, cuz all that means is that this function hasnt done executing yet, so to fix the cant read properties of undefined, just render conditionally, this should take care of the error, and the component will render normally once this function is done executing.
  }, []);

  useEffect(() => {
    setUpUser();
  }, [config]);

  function toggleUnfollowConfirmationScreen(targetUser = null) {
    if (showUnfollowConfirmationScreen) {
      setShowUnfollowConfirmationScreen(false);
    } else {
      setUnfollowConfirmationScreenTargetUser(targetUser);
      setShowUnfollowConfirmationScreen(true);
    }
  }

  function toggleSharePostScreen(post = null) {
    setShowSharePostScreen(!showSharePostScreen);
    if (post) {
      setSharePostScreenPostData(post);
    }
  }

  async function setUpUser() {
    let { data } = await axios.get(
      `${process.env.REACT_APP_BACKENDAPI}/`,
      config
    );

    if (data.user_id && data.user_id != -1) {
      const result = await axios.get(
        `${process.env.REACT_APP_BACKENDAPI}/users/${data.user_id}`,
        config
      );
      setUser(result.data.user);
      socket.emit("auth", result.data.user._id); // cuz this whole function (setUpUser)'s purpose is for when the user logged in, then either refreshed or closed the website and reopened it, but since they wont have to login, we have to make sure that they still get added to the connectedUsers array in the backend, cuz the only way for a user to get added to that array is via the 'auth' event
    } else {
      localStorage.setItem("config", null);
    }
  }

  async function updatePosts() {}

  async function updateChats() {}

  async function updateNotifications() {}

  async function updateFollowing() {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKENDAPI}/users/${user._id}/following`,
      config
    );
    // setUser(produce((draft)=>{draft.following = data.following; draft.following_ids = data.following_ids}))
    setUser((prev) => ({
      ...prev,
      following_ids: data.following_ids,
      following: data.following,
    }));
  }

  async function login(username, password) {
    setIsLoading(true);
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKENDAPI}/login`,
      { username, password },
      config
    );
    setToken(data.token);
    if (data.token) {
      setConfig({
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });
      localStorage.setItem(
        "config",
        await JSON.stringify({
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        })
      );
    }
    if (data.user_id) {
      const result = await axios.get(
        `${process.env.REACT_APP_BACKENDAPI}/users/${data.user_id}`,
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );
      // setUser(produce((draft) => {draft = result.data.user}))

      socket.emit("auth", result.data.user._id);
      setUser(result.data.user);
    }
    setIsLoading(false);
  }
  async function logout() {
    const { status } = await axios.get(
      `${process.env.REACT_APP_BACKENDAPI}/logout`,
      config
    );
    localStorage.clear();
    return status;
  }

  async function fetchSuggestedUsers(filter = null) {
    const cachedSuggestedUsers = await localStorageGetItem(
      "suggestedUsers",
      fiveminsInMS
    );
    if (cachedSuggestedUsers) return cachedSuggestedUsers;

    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKENDAPI}/users/suggestions${
        filter ? `?input=${filter}` : ""
      }`,
      config
    );
    const suggestedUsers = data.suggested_users;

    await localStorageSetItem("suggestedUsers", {
      suggestedUsers,
    });
    return suggestedUsers;
  }

  async function fetchFeedPosts() {
    const cachedFeedPosts = await localStorageGetItem(
      "Feed Posts",
      fiveminsInMS
    );
    if (cachedFeedPosts) return cachedFeedPosts;

    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKENDAPI}/posts/fyp`,
      config
    );

    await localStorageSetItem("Feed Posts", data.feedPosts);
    return data.feedPosts;
  }

  async function fetchSuggestedPosts() {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKENDAPI}/posts/suggestions`,
      config
    );
    return data.suggestedPosts;
  }

  async function followUser(targetUser_id) {
    const { status } = await axios.patch(
      `${process.env.REACT_APP_BACKENDAPI}/users/${user._id}/following`,
      { targetID: targetUser_id },
      config
    ); //update who the user is following, "targetID" is the id of the  person who's been newly added to the user's following list.

    if (status === 200) {
      await updateFollowing();
    }
  }

  async function unfollowUser(targetUser_id) {
    try {
      const { status } = await axios.delete(
        `${process.env.REACT_APP_BACKENDAPI}/users/${user._id}/following/${targetUser_id}`,
        config
      );

      if (status === 204) {
        await updateFollowing();
        toggleUnfollowConfirmationScreen();
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handlePostLikeUnLikeAndGetTheUpdatedLikesForThisPost(post_id) {
    // postID x
    const { data } = await axios.patch(
      `${process.env.REACT_APP_BACKENDAPI}/posts/${post_id}/likes`,
      {},
      config
    );
    return data.newLikesForPost; // this will return the new array of likes for postID x
  }
  async function handleCommentLikeUnlike(post_id, commentID) {
    const { data } = await axios.patch(
      `${process.env.REACT_APP_BACKENDAPI}/posts/${post_id}/comments/${commentID}/likes`,
      {},
      config
    );
    return data.newLikesForComment;
  }

  async function postStorySlide(slideFormData) {
    setIsLoading(true);
    await axios.patch(
      `${process.env.REACT_APP_BACKENDAPI}/users/${user._id}/story`,
      slideFormData,
      { headers: { "Content-Type": "multipart/form-data", ...config.headers } }
    );
    setIsLoading(false);
  }

  function getPeopleYouFollowThatFollowTheSuggestedUser(targetUser) {
    let temp = [];
    for (const following of user.following) {
      const target = targetUser.followedBy_ids.find(
        (followerID) => followerID == following._id
      );

      if (target) {
        temp.push(following);
      }
    }
    return temp;
  }

  async function savePost(post_id) {
    const { data } = await axios.patch(
      `${process.env.REACT_APP_BACKENDAPI}/users/${user._id}/saved-posts`,
      { targetPost_id: post_id },
      config
    );
    const { savedPosts_ids } = data;

    setUser((prev) => ({ ...prev, savedPosts_ids }));
  }

  async function fetchStory(targetUserUsername) {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKENDAPI}/users/${targetUserUsername}/story`,
      config
    );
    return data.story;
  }

  async function fetchStories() {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKENDAPI}/users/${user.username}/feed-stories`,
      config
    );
    return data.stories;
  }

  async function updateStorySlideViewsAndUpdateUserData(
    slideID,
    targetUser_username
  ) {
    const { data } = await axios.patch(
      `${process.env.REACT_APP_BACKENDAPI}/users/${targetUser_username}/story/slides/${slideID}`,
      {},
      config
    );
    setUser((prev) => {
      const filteredFollowing = user.following.filter(
        (following) => following.username != targetUser_username
      );
      const targetUser = user.following.find(
        (following) => following.username == targetUser_username
      );
      targetUser.story = data.story; // setting their story to the new story, which is the same as their previous one, except with one of the slides updated by having the user as a view added to it.
      const following = [...filteredFollowing, targetUser];
      return { ...prev, following };
    });
  }

  async function fetchChat(targetChat_id) {
    if (targetChat_id.length == 24) {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKENDAPI}/chats/${targetChat_id}`,
        config
      );

      return data.targetChat;
    }
  }

  async function createChatAndGetIts_id(user1_id, user2_id) {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKENDAPI}/chats`,
      { user1_id, user2_id },
      config
    );
    return data.chat_id;
  }
  function socketEmitUserEnteredChat(chat_id) {
    socket.emit("userEnteredChat", chat_id);
  }
  function socketChatMessagesUpdate(chat_id) {
    socket.emit("messageSent", chat_id);
  }

  async function createPostAndUpdateUserData(formData) {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKENDAPI}/users/${user._id}/posts`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data", ...config.headers },
        }
      );
      setUser((prev) => ({
        ...prev,
        posts_ids: data.posts_ids,
        posts: [...prev.posts, data.newPost],
      }));
    } catch (error) {
      console.log(error);
    } finally {
      return;
    }
  }
  function formatCreationDate(creationDate) {
    const creationDateDateObj = new Date(creationDate);
    const now = new Date(); // for comparision
    return (
      creationDateDateObj.toLocaleDateString("default", { month: "long" }) +
      " " +
      creationDateDateObj.getDate() +
      (now.getFullYear() - creationDateDateObj.getFullYear() == 0
        ? ""
        : " " + creationDateDateObj.getFullYear())
    );
  }

  async function handlePostLikeUnLike(post_id) {
    const { data } = await axios.patch(
      `${process.env.REACT_APP_BACKENDAPI}/posts/${post_id}/likes`,
      {},
      config
    );
    return data.newLikesForPost;
  }
  async function handleCommentLikeUnlike(post_id, commentID) {
    const { data } = await axios.patch(
      `${process.env.REACT_APP_BACKENDAPI}/posts/${post_id}/comments/${commentID}/likes`,
      {},
      config
    );
    return data.newLikesForComment;
  }

  async function handleReplyLikeUnlike(post_id, commentID, replyID) {
    const { data } = await axios.patch(
      `${process.env.REACT_APP_BACKENDAPI}/posts/${post_id}/comments/${commentID}/replies/${replyID}/likes`,
      {},
      config
    );
    return data.newLikesForComment;
  }

  function formatAge(creationDate) {
    const now = Date.now();
    const age = now - creationDate;
    const seconds = Math.floor(age / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
    if (seconds < 60) {
      return "Just now";
    }
    if (minutes < 60) {
      return `${minutes} ${minutes > 1 ? "minutes" : "minute"} ago`;
    }
    if (hours < 24) {
      return `${hours} ${hours > 1 ? "hours" : "hour"} ago`;
    }
    if (days < 30) {
      return `${days} ${days > 1 ? "days" : "day"} ago`;
    }
    if (months < 12) {
      return `${months} ${months > 1 ? "months" : "month"} ago`;
    }
    return `${years} ${years > 1 ? "years" : "year"} ago`;
  }

  async function postComment(post_id, comment) {
    if (user && user._id != -1) {
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_BACKENDAPI}/posts/${post_id}/comments`,
          { comment },
          config
        );
        return data.newComment;
      } catch (error) {
        console.log(error);
      }
    }
  }
  async function postReply(post_id, comment_id, reply) {
    if (user && user._id != -1) {
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_BACKENDAPI}/posts/${post_id}/comments/${comment_id}/replies`,
          { reply },
          config
        );
        return data.newComments;
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function fetchUserData(user_id) {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKENDAPI}/users/${user_id}`
    ); // this is for fetching other people's data, hence the no credentials.
    return data.targetUser;
  }

  async function sendMessage(chat_id, formData) {
    //formData: text, files
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKENDAPI}/chats/${chat_id}/messages`,
      formData,
      { headers: { "Content-Type": "multipart/form-data", ...config.headers } }
    );
    socketChatMessagesUpdate(chat_id);
    return data.newMessage;
  }

  async function uploadPFP(formData) {
    const { status } = await axios.post(
      `${process.env.REACT_APP_BACKENDAPI}/users/${user._id}/profile-picture`,
      formData,
      { headers: { "Content-Type": "multipart/form-data", ...config } }
    );
    return status;
  }

  async function deletePFP(user_Id) {
    await axios.delete(
      `${process.env.REACT_APP_BACKENDAPI}/users/${user_Id}/profile-picture`,
      {
        withCredentials: true,
      }
    );
    return;
  }
  return (
    <userContext.Provider
      value={{
        user,
        setUser,
        config,
        socket,
        login,
        fetchSuggestedUsers,
        toggleUnfollowConfirmationScreen,
        followUser,
        unfollowUser,
        updateFollowing,
        uploadPFP,
        deletePFP,
        isLoading,
        setIsLoading,
        getPeopleYouFollowThatFollowTheSuggestedUser,
        fetchFeedPosts,
        fetchSuggestedPosts,
        showCreateNewPostScreen,
        setShowCreateNewPostScreen,
        handlePostLikeUnLikeAndGetTheUpdatedLikesForThisPost,
        handleCommentLikeUnlike,
        savePost,
        postStorySlide,
        fetchStory,
        updateStorySlideViewsAndUpdateUserData,
        fetchStories,
        socketEmitUserEnteredChat,
        socketChatMessagesUpdate,
        fetchChat,
        createChatAndGetIts_id,
        showSuggestedPage,
        setShowSuggestedPage,
        showSwitchScreen,
        setShowSwitchScreen,
        logout,
        createPostAndUpdateUserData,
        formatCreationDate,
        handlePostLikeUnLike,
        formatAge,
        postComment,
        postReply,
        handleReplyLikeUnlike,
        fetchUserData,
        sharePostScreenPostData,
        setSharePostScreenPostData,
        toggleSharePostScreen,
        sendMessage,
        showSharePostScreen,
        setShowSharePostScreen,
        showUnfollowConfirmationScreen,
        unfollowConfirmationScreenTargetUser,
        setUnfollowConfirmationScreenTargetUser,
        showBlackBackGround,
        setShowBlackBackground,
      }}
    >
      {children}
    </userContext.Provider>
  );
}

export default userContext;

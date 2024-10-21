import { useNavigate } from "react-router-dom";

export const useCustomNavigate = () => {
  const navigate = useNavigate();
  const goTo = (to: string) => navigate(to);

  function goToRoot() {
    return goTo("/");
  }

  function goToUserId(id: number) {
    return goTo(`/users/${id}`);
  }

  function goToExplore() {
    return goTo(`/explore`);
  }

  function goToReels() {
    return goTo(`/reels`);
  }

  function goToChats() {
    return goTo(`/chats`);
  }
  return { goToRoot, goToUserId, goToExplore, goToReels, goToChats };
};

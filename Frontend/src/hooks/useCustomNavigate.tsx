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

  return { goToRoot, goToUserId };
};

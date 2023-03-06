import { useSelector } from "react-redux";

export const useUser = () => {
  const user = useSelector((state) => state.auth.user);
  const localUser = JSON.parse(localStorage.getItem("user"));
  const currentUser = user ?? localUser;
  return {
    currentUser,
  };
};

import { useSelector } from "react-redux";

interface UserState {
  auth: {
    user: {
      username: string;
      email: string;
      token: string;
    };
  };
}

export const useUser = () => {
  const user = useSelector((state: UserState) => state.auth.user);
  const localUser = JSON.parse(localStorage.getItem("user") || "null");
  const currentUser = user ?? localUser;
  return {
    currentUser,
  };
};

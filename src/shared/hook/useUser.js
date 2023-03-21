import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getSettings } from "../../Store/actions/settingsActions";
import { useDispatch } from "react-redux";

export const useUser = () => {
  const user = useSelector((state) => state.auth.user);
  const localUser = JSON.parse(localStorage.getItem("user"));
  const currentUser = user ?? localUser;
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      dispatch(getSettings(currentUser));
    }
  }, [dispatch, currentUser]);

  return {
    currentUser,
  };
};

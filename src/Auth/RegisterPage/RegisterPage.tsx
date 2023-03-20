import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import AuthBox from "../../Shared/Components/AuthBox";
import RegisterPageInputs from "./RegisterPageInputs";
import RegisterPageFooter from "./RegisterPageFooter";
import { validateRegisterForm } from "../../Shared/Utils/validators";
import { connect, ConnectedProps } from "react-redux";
import { getActions } from "../../Store/actions/authActions";
import { useNavigate } from "react-router-dom";

interface UserDetails {
  mail: string;
  password: string;
  username: string;
}

interface RegisterPageProps extends ConnectedProps<typeof connector> {
  register: (userDetails: UserDetails, history: any) => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ register }) => {
  const history = useNavigate();

  const [mail, setMail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isFormValid, setIsFormValid] = useState(false);

  const handleRegister = () => {
    const userDetails: UserDetails = {
      mail,
      password,
      username,
    };

    register(userDetails, history);
  };

  useEffect(() => {
    setIsFormValid(
      validateRegisterForm({
        mail,
        username,
        password,
      })
    );
  }, [mail, username, password, setIsFormValid]);

  return (
    <AuthBox>
      <Typography variant="h5" sx={{ color: "white " }}>
        Create an account
      </Typography>
      <RegisterPageInputs
        mail={mail}
        setMail={setMail}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
      <RegisterPageFooter
        handleRegister={handleRegister}
        isFormValid={isFormValid}
      />
    </AuthBox>
  );
};

const mapDispatch = {
  ...getActions,
};

const connector = connect(null, mapDispatch);

export default connector(RegisterPage);

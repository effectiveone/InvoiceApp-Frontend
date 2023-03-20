import React from "react";
import CustomPrimaryButton from "../../Shared/Components/CustomPrimaryButton";
import RedirectInfo from "../../Shared/Components/RedirectInfo";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";

interface RegisterPageFooterProps {
  handleRegister: () => void;
  isFormValid: boolean;
}

const getFormNotValidMessage = (): string => {
  return "Username should contain between 3 and 12 characters and password should contain between 6 and 12 characters. Also, a correct e-mail address should be provided.";
};

const getFormValidMessage = (): string => {
  return "Press to register!";
};

const RegisterPageFooter: React.FC<RegisterPageFooterProps> = ({
  handleRegister,
  isFormValid,
}) => {
  const history = useNavigate();

  const handlePushToLoginPage = () => {
    history("/login");
  };

  return (
    <>
      <Tooltip
        title={!isFormValid ? getFormNotValidMessage() : getFormValidMessage()}
      >
        <div>
          <CustomPrimaryButton
            label="Register"
            additionalStyles={{ marginTop: "30px" }}
            disabled={!isFormValid}
            onClick={handleRegister}
          />
        </div>
      </Tooltip>
      <RedirectInfo
        text=""
        redirectText="Already have an account?"
        additionalStyles={{ marginTop: "5px" }}
        redirectHandler={handlePushToLoginPage}
      />
    </>
  );
};

export default RegisterPageFooter;

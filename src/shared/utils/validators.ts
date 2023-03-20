export const validateLoginForm = ({
  mail,
  password,
}: {
  mail: string;
  password: string;
}): boolean => {
  const isMailValid = validateMail(mail);
  const isPasswordValid = validatePassword(password);

  return isMailValid && isPasswordValid;
};

export const validateRegisterForm = ({
  mail,
  password,
  username,
}: {
  mail: string;
  password: string;
  username: string;
}): boolean => {
  return (
    validateMail(mail) &&
    validatePassword(password) &&
    validateUsername(username)
  );
};

const validatePassword = (password: string): boolean => {
  return password.length > 5 && password.length < 13;
};

const validateMail = (mail: string): boolean => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(mail);
};

const validateUsername = (username: string): boolean => {
  return username.length > 2 && username.length < 13;
};

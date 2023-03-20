export const logout = (): void => {
  localStorage.clear();
  window.location.pathname = "/login";
};

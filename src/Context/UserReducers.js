export const USER_ACTIONS = {
  LOGIN: "login",
  LOGOUT: "logout",
};

const getData = () => {
  const user = localStorage.getItem("zohoUser");
  if (user) return JSON.parse(user);
  return {};
};

export const UserReducers = (InitialState = getData(), actions) => {
  switch (actions.type) {
    case USER_ACTIONS.LOGIN:
      if (actions.payload) {
        localStorage.setItem("zohoUser", JSON.stringify(actions.payload));
        return actions.payload;
      }
      return InitialState;

    case USER_ACTIONS.LOGOUT:
      localStorage.removeItem("zohoUser");
      return {};
    default:
      return InitialState;
  }
};

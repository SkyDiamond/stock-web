import axios from "axios";

export const login = (user) => {
  return (dispatch) => {
    axios
      .post("http://localhost:5000/users/login", {
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        // console.log(response)
        if (response.data.token) {
          dispatch({ type: "LOGIN_SUCCESS", response });
        } else {
          dispatch({ type: "LOGIN_FAIL", response });
        }
      })
      .catch((err) => {
        // console.log(err);
        // dispatch({ type: 'LOGIN_ERROR', err})
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("usertoken");
    dispatch({ type: "LOGOUT" });
  };
};
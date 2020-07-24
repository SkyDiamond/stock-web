import axios from "axios";

export const getUser = () => {
  return (dispatch) => {
    axios
      .get("http://127.0.0.1:5000/users/get", {
        headers: { "Content-type": "application/json" },
      })
      .then((res) => {
        dispatch({ type: "FETCH_USER", res });
      });
  };
};

export const deleteUser = (id) => {
  return (dispatch) => {
    axios
      .delete(`http://127.0.0.1:5000/users/delete/${id}`, {
        headers: { "Content-type": "application/json" },
      })
      .then(() => {
        dispatch({ type: "DELETE_USER", id });
      });
  };
};

export const editUser = (id) => {
  return (dispatch) => {
    dispatch({ type: "EDIT_USER", id });
  };
};

export const updateUser = (id, newUser) => {
  return (dispatch) => {
    axios
      .put(`http://127.0.0.1:5000/users/update/${id}`, {
        user_fname: newUser.user_fname,
        user_lname: newUser.user_lname,
        user_email: newUser.user_email,
      })
      .then((res) => {
        // console.log(res)
        dispatch({ type: "UPDATE_USER", id, newUser });
      });
  };
};

export const addUser = (newUser) => {
  return (dispatch) => {
    axios
      .post("http://127.0.0.1:5000/users/register", {
        first_name: newUser.user_fname,
        last_name: newUser.user_lname,
        email: newUser.user_email,
        password: newUser.user_pass,
      })
      .then((res) => {
        axios
          .get("http://127.0.0.1:5000/users/get", {
            headers: { "Content-type": "application/json" },
          })
          .then((res) => {
            dispatch({ type: "FETCH_USER", res });
          });
        // console.log(res.data);
        // dispatch({ type: "ADD_USER", res, newUser });
      });
  };
};

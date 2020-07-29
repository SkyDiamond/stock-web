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

export const updateUser = (id, newData) => {
  return (dispatch) => {
    axios
      .put(`http://127.0.0.1:5000/users/update/${id}`, {
        user_email: newData.user_email,
        user_pass: newData.user_pass,
        job_position: newData.job_position,
      })
      .then((res) => {
        // console.log(res)
        dispatch({ type: "UPDATE_USER", id, newData });
      });
  };
};

export const addUser = (newUser) => {
  return (dispatch) => {
    axios
      .post("http://127.0.0.1:5000/users/register", {
        email: newUser.user_email,
        password: newUser.user_pass,
        job_position: newUser.job_position
      })
      .then((res) => {
        if(res.data.error){
          dispatch({ type: "ERROR_USER", res });
        }else{
          axios
            .get("http://127.0.0.1:5000/users/get", {
              headers: { "Content-type": "application/json" },
            })
            .then((res) => {
              dispatch({ type: "FETCH_USER", res });
            });
        }
        // console.log(res.data);
        // dispatch({ type: "ADD_USER", res, newUser });
      });
  };
};

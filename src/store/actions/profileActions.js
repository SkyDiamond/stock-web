import axios from "axios";

export const getProfile = (id) => {
  return (dispatch) => {
    axios
      .get(`http://127.0.0.1:5000/profiles/get/${id}`, {
        headers: { "Content-type": "application/json" },
      })
      .then((res) => {
        // console.log(res.data)
        dispatch({ type: "FETCH_PROFILE", res });
      })
      .catch((err) => {
        // console.log(err);
        // dispatch({ type: 'LOGIN_ERROR', err})
      });
  };
};

export const updateProfile = (id, newProfile) => {
  return (dispatch) => {
    axios
      .put(`http://127.0.0.1:5000/profiles/update/${id}`, {
        first_name: newProfile.user_fname,
        last_name: newProfile.user_lname,
        birth_day: newProfile.user_birthday,
        profile_img: newProfile.profile_img,
      })
      .then((res) => {
        // console.log(res.data)
        dispatch({ type: "UPDATE_PROFILE", id, newProfile, res });
      });
  };
};

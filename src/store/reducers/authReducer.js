import jwt_decode from "jwt-decode";

const initState = {
  currentUser: [],
  authError: null,
};
const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      localStorage.setItem("usertoken", action.response.data.token);
      const token_decode = jwt_decode(localStorage.token);
      var data = {};
      var val = token_decode;

      data.user_id = val.user_id;
      data.user_fname = val.first_name;
      data.user_lname = val.last_name;
      data.user_email = val.email;
      data.user_created = val.user_created;
      data.user_editing = false;

      console.log(data);
      return {
        ...state,
        currentUser: data,
        authError: null,
      };

    case "LOGIN_FAIL":
      var errorMessage = action.response.data.error;
      return {
        ...state,
        authError: errorMessage,
      };
    default:
      return state;
  }
};
export default authReducer;

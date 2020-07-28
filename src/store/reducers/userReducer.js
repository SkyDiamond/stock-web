const initState = {
  users: [],
  editmode: false,
};
const userReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_USER":
      var data = [];
      
      Object.keys(action.res.data).forEach((key) => {
        var val = action.res.data[key];

        data.push({
          user_id: val.user_id,
          // user_fname: val.first_name,
          // user_lname: val.last_name,
          user_email: val.email,
          user_created: val.user_created,
          user_editing: false,
        });
      });
      return {
        ...state,
        users: data,
      };
    case "DELETE_USER":
      var delData = [];
      delData = state.users.filter((user) => user.user_id !== action.id);
      return {
        ...state,
        users: delData,
      };
    case "EDIT_USER":
      return {
        ...state,
        users: state.users.map((user) =>
          user.user_id === action.id
            ? { ...user, user_editing: !user.user_editing }
            : user
        ),
        editmode: !state.editmode,
      };
    case "UPDATE_USER":
      return {
        ...state,
        users: state.users.map((user) =>
          user.user_id === action.id
            ? {
                ...user,
                // user_fname: action.newUser.user_fname,
                // user_lname: action.newUser.user_lname,
                user_email: action.newUser.user_email,
                user_editing: !user.user_editing,
              }
            : user
        ),
        editmode: !state.editmode,
      };
    case "ADD_USER":
      var val = action.res.newUser;

      data.push({
        user_id: val.user_id,
        // user_fname: val.first_name,
        // user_lname: val.last_name,
        user_email: val.email,
        user_created: val.user_created,
        user_editing: false,
      });
      return {
        ...state,
        users: data,
      };
    default:
      return state;
  }
};
export default userReducer;

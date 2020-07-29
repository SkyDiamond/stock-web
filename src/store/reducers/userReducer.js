const initState = {
  users: [],
  userMessage: null,
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
          user_email: val.email,
          job_position: val.job_position,
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
                user_email: action.newData.user_email,
                job_position: action.newData.job_position,
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
        user_email: val.email,
        user_created: val.user_created,
        user_editing: false,
      });
      return {
        ...state,
        users: data,
        userMessage: null,
      };
      case "ERROR_USER":
        return {
          ...state,
          userMessage: action.res.data.error,
        };
    default:
      return state;
  }
};
export default userReducer;

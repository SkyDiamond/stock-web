const initState = {
  profile: null,
  profileMessage: null
};
const profileReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_PROFILE":
      // console.log(action.res.data);
      var data = {};
      var val = action.res.data.profile;

      data.profile_id = val.profile_id;
      data.user_fname = val.first_name;
      data.user_lname = val.last_name;
      data.user_birthday = val.birth_day;
      data.user_img = action.res.data.profile_img;
      data.user_id = val.user_id;

      return {
        ...state,
        profile: data,
        profileMessage: null
      };

    case "UPDATE_PROFILE":
      // console.log(action.newProfile)

      return {
        ...state,
        profile: {
          ...state.profile,
          user_fname: action.newProfile.user_fname,
          user_lname: action.newProfile.user_lname,
          user_birthday: action.newProfile.user_birthday,
        },
        profileMessage: action.res.data.status
      };
    case "LOGOUT":
      return {
        ...state,
        profile: null,
      };
    default:
      return state;
  }
};
export default profileReducer;

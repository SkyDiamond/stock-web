import axios from 'axios'

export const login = user => {
  return axios
    .post("http://localhost:5000/users/login", {
      email: user.email,
      password: user.password
    })
    .then((response) => {
      // dispatch({ type: "LOGIN_SUCCESS" });
      localStorage.setItem('usertoken', response.data.token)
      return response.data
    })
    .catch(err => {
      console.log(err);
      // dispatch({ type: 'LOGIN_ERROR', err})
    });
};
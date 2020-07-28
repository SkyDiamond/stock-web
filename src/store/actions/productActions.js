import axios from "axios";

export const getProduct = () => {
  return (dispatch) => {
    axios
      .get(`http://127.0.0.1:5000/product/get`, {
        headers: { "Content-type": "application/json" },
      })
      .then((res) => {
        // console.log(res.data)
        dispatch({ type: "FETCH_PRODUCT", res });
      })
      .catch((err) => {
        // console.log(err);
        // dispatch({ type: 'LOGIN_ERROR', err})
      });
  };
};

export const addProduct = (newProduct) => {
  return (dispatch) => {
    axios
      .post("http://127.0.0.1:5000/product/add", {
        product_name: newProduct.product_name,
        product_price: newProduct.product_price,
        product_amount: newProduct.product_amount,
        product_img: newProduct.product_img,
        uid_editor: newProduct.uid_editor
      })
      .then((res) => {
        axios
          .get("http://127.0.0.1:5000/product/get", {
            headers: { "Content-type": "application/json" },
          })
          .then((res) => {
            dispatch({ type: "FETCH_PRODUCT", res });
          });
        // console.log(res.data);
        // dispatch({ type: "ADD_PRODUCT", res, newUser });
      });
  };
};

export const updateProduct = (id, newProduct) => {
  return (dispatch) => {
    axios
      .put(`http://127.0.0.1:5000/product/update/${id}`, {
        first_name: newProduct.user_fname,
        last_name: newProduct.user_lname,
        birth_day: newProduct.user_birthday,
        profile_img: newProduct.profile_img,
      })
      .then((res) => {
        // console.log(res.data)
        dispatch({ type: "UPDATE_PRODUCT", id, newProduct, res });
      });
  };
};

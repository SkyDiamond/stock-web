import axios from "axios";

export const getAllProduct = () => {
  return (dispatch) => {
    axios
      .get(`http://127.0.0.1:5000/product/get`, {
        headers: { "Content-type": "application/json" },
      })
      .then((res) => {
        // console.log(res.data)
        dispatch({ type: "FETCH_ALL_PRODUCT", res });
      })
      .catch((err) => {
        // console.log(err);
        // dispatch({ type: 'LOGIN_ERROR', err})
      });
  };
};

export const getProduct = (id) => {
  return (dispatch) => {
    axios
      .get(`http://127.0.0.1:5000/product/get/${id}`, {
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

export const addProduct = (formData) => {
  // console.log(newProduct.product_img.get("product_img"))
  return (dispatch) => {
    axios.post("http://127.0.0.1:5000/product/add", formData).then((res) => {
      axios
        .get("http://127.0.0.1:5000/product/get", {
          headers: { "Content-type": "application/json" },
        })
        .then((res) => {
          dispatch({ type: "FETCH_ALL_PRODUCT", res });
        });
      // console.log(res.data);
      // dispatch({ type: "ADD_PRODUCT", res, newUser });
    });
  };
};

export const deleteProduct = (id) => {
  return (dispatch) => {
    axios
      .delete(`http://127.0.0.1:5000/product/delete/${id}`, {
        headers: { "Content-type": "application/json" },
      })
      .then(() => {
        dispatch({ type: "DELETE_PRODUCT", id });
      });
  };
};


export const updateProduct = (id, formData) => {
  return (dispatch) => {
    axios
      .put(`http://127.0.0.1:5000/product/update/${id}`, formData)
      .then((res) => {
        // console.log(res.data)
        dispatch({ type: "UPDATE_PRODUCT", id, res });
      });
  };
};

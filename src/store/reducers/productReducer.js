const initState = {
  products: [],
  productMessage: null,
};
const productReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_PRODUCT":
      var data = [];
      // console.log(action.res.data.product);
      Object.keys(action.res.data.product).forEach((key) => {
        var val = action.res.data.product[key];

        data.push({
          product_id: val.product_id,
          product_name: val.product_name,
          product_price: val.product_price,
          product_amount: val.product_amount,
          profile_img: action.res.data.profile_img,
          uid_editor: val.uid_editor,
        });
      });
      return {
        ...state,
        products: data,
        productMessage: null,
      };

    // case "UPDATE_PRODUCT":
    //   return {
    //     ...state,
    //     product: {
    //       ...state.product,
    //       user_fname: action.newProduct.user_fname,
    //       user_lname: action.newProduct.user_lname,
    //       user_birthday: action.newProduct.user_birthday,
    //     },
    //     productMessage: action.res.data.status,
    //   };
    case "ADD_PRODUCT":
      return state;
    default:
      return state;
  }
};
export default productReducer;

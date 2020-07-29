const initState = {
  products: [],
  product: {},
  productMessage: null,
};
const productReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_ALL_PRODUCT":
      var data = [];
      // console.log(action.res.data.product);
      Object.keys(action.res.data.product).forEach((key) => {
        var val = action.res.data.product[key];

        data.push({
          product_id: val.product_id,
          product_name: val.product_name,
          product_price: val.product_price,
          product_amount: val.product_amount,
          product_img: val.product_img,
          uid_editor: val.uid_editor,
        });
      });
      return {
        ...state,
        products: data,
        productMessage: null,
      };
    case "ADD_PRODUCT":
      return state;
    case "FETCH_PRODUCT":
      var product = {};
      var val = action.res.data;

      product.product_id = val.product_id;
      product.product_name = val.product_name;
      product.product_price = val.product_price;
      product.product_amount = val.product_amount;
      product.product_img = val.product_img;
      product.uid_editor = val.uid_editor;

      return {
        ...state,
        product: product,
      };
    case "DELETE_PRODUCT":
      var delData = [];
      delData = state.products.filter(
        (product) => product.product_id !== action.id
      );
      return {
        ...state,
        products: delData,
      };
    case "UPDATE_PRODUCT":
      // console.log(action.res.data.product_name)
      return {
        ...state,
        products: state.products.map((product) =>
          product.product_id === action.id
            ? {
                ...product,
                product_name: action.res.data.product_name,
                product_price: action.res.data.product_price,
                product_amount: action.res.data.product_amount,
                product_img: action.res.data.product_img,
                uid_editor: action.res.data.uid_editor,
              }
            : product
        ),
      };
    default:
      return state;
  }
};
export default productReducer;

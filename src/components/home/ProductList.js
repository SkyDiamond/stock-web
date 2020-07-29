import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "redux";
import { connect } from "react-redux";
import { getAllProduct } from "../../store/actions/productActions";

import { Grid, TextField, Paper, CircularProgress } from "@material-ui/core";
import ProductCard from "./ProductCard";

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
  grid: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loading: {
    padding: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

class ProductList extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.props.getAllProduct();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { classes, products } = this.props;

    if (products)
      return (
        <Grid container spacing={3} className={classes.root}>
          <Grid className={classes.grid} item xs={12}>
            <TextField
              className={classes.textField}
              type="text"
              name="search"
              value={this.state.search}
              onChange={this.onChange}
              label="ค้นหาสินค้า"
              variant="outlined"
              fullWidth
            />
          </Grid>
          {products &&
            products
              .filter(
                (product) =>
                  product.product_name
                    .toLowerCase()
                    .startsWith(this.state.search) ||
                  product.product_name
                    .toUpperCase()
                    .startsWith(this.state.search) ||
                  product.product_name.startsWith(this.state.search)
              )
              .map((product) => (
                <ProductCard key={product.product_id} product={product} />
              ))}
        </Grid>
      );
    else
      return (
        <Paper className={classes.root}>
          <Grid className={classes.loading}>
            <CircularProgress />
          </Grid>
        </Paper>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.product.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllProduct: () => dispatch(getAllProduct()),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(useStyles)
)(ProductList);

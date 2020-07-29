import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "redux";
import { connect } from "react-redux";
import { getAllProduct } from "../../store/actions/productActions";

import Grid from "@material-ui/core/Grid";
import ProductCard from "./ProductCard";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";

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
  componentDidMount() {
    this.props.getAllProduct();
  }

  render() {
    const { classes, products } = this.props;
    
    if (products)
      return (
          <Grid container spacing={3} className={classes.root}>
            {products.map((product) => (
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

import React, { Component } from "react";
import { deleteProduct } from "../../store/actions/productActions";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";

// import RunImg from "../img/Card.jpg"

//material-ui
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Grid,
  CardActionArea,
  Divider,
} from "@material-ui/core";

// import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = (theme) => ({
  media: {
    height: 140,
    width: "100%",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  dvd: {
    margin: theme.spacing(1),
  },
});

class ProductCard extends Component {
  onDelete = (val, e) => {
    e.preventDefault();
    this.props.deleteProduct(val.product_id);
  };

  render() {
    const { classes, product } = this.props;

    return (
      <Grid item xs={6} sm={4} md={4} lg={3}>
        <Card>
          <CardActionArea
            component={Link}
            to={"/product/" + product.product_id}
            style={{ textDecoration: "none" }}
          >
            <CardMedia
              className={classes.media}
              image={`http://localhost:5000/uploads/${product.product_img}`}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {product.product_name}
              </Typography>
              <Divider className={classes.dvd} />
              <Typography
                gutterBottom
                variant="body1"
                color="textSecondary"
                component="p"
              >
                ราคาต่อชิ้น : {product.product_price} บาท
              </Typography>
              <Typography
                gutterBottom
                variant="body2"
                color="textSecondary"
                component="p"
              >
                จำนวนที่เหลือ : {product.product_amount} ชิ้น
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions disableSpacing>
            {/* <IconButton aria-label="edit">
              <EditIcon />
            </IconButton> */}
            <IconButton onClick={this.onDelete.bind(this, product)}>
              <DeleteIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteProduct: (id) => dispatch(deleteProduct(id)),
  };
};
export default compose(
  connect(null, mapDispatchToProps),
  withStyles(useStyles)
)(ProductCard);

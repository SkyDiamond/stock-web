import React, { Component } from "react";
import { Link } from "react-router-dom";

// import RunImg from "../img/Card.jpg"

//material-ui
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import Grid from "@material-ui/core/Grid";
import CardActionArea from "@material-ui/core/CardActionArea";

const useStyles = (theme) => ({
  media: {
    // height: 140,
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  underline: {
    underline: "none",
  },
});

class ProductCard extends Component {
  render() {
    const { classes, product } = this.props;

    return (
      <Grid item xs={6} sm={4} md={4} lg={3}>
        <Card>
          <CardActionArea
            component={Link}
            to={'/product/' + product.product_id}
            style={{ textDecoration: "none" }}
          >
            <CardMedia
              className={classes.media}
              // image={RunImg}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {product.product_name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {product.product_price}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
    );
  }
}

export default withStyles(useStyles)(ProductCard);

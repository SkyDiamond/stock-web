import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { addProduct } from "../../store/actions/productActions";
import { Redirect } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";

import {
  Container,
  Paper,
  Grid,
  TextField,
  Typography,
  Button,
} from "@material-ui/core";

const useStyles = (theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  cont: {
    padding: theme.spacing(2),
  },
  grid: {
    padding: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  textField: {
    width: "100%",
    margin: theme.spacing(1),
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  media: {
    width: "50%",
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
});

class AddProduct extends Component {
  constructor() {
    super();
    this.state = {
      product_name: "",
      product_price: "",
      product_amount: "",
      product_img: null,
      uid_editor: "",
      selectedFile: null,
      error: {},
      errorMessage: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = (e) => {
    switch (e.target.name) {
      case "selectedFile":
        this.setState({ selectedFile: e.target.files[0] });
        break;
      default:
        this.setState({ [e.target.name]: e.target.value });
    }
  };
  onSubmit(e) {
    e.preventDefault();
    const token_decode = jwt_decode(localStorage.usertoken);
    const {
      product_img,
      product_name,
      product_amount,
      product_price,
    } = this.state;
    let formData = new FormData();

    formData.append("product_img", product_img);
    formData.append("product_name", product_name);
    formData.append("product_price", product_price);
    formData.append("product_amount", product_amount);
    formData.append("uid_editor", token_decode.user_id);

    if (
      this.state.product_name !== "" &&
      this.state.product_price !== "" &&
      this.state.product_amount !== "" &&
      this.state.selectedFile !== null
    ) {
      // console.log(newProduct);
      this.props.addProduct(formData);
      this.props.history.push(`/`);
    }
  }

  handleUploadClick = (e) => {
    var file = e.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);

      reader.onloadend = function (e) {
        this.setState({
          selectedFile: [reader.result],
        });
      }.bind(this);

      this.setState({ product_img: e.target.files[0] });
    }
  };

  render() {
    const { classes } = this.props;
    if (!localStorage.usertoken) return <Redirect to="/login" />;
    return (
      <React.Fragment>
        <Container maxWidth="xl" className={classes.cont}>
          <Container maxWidth="lg">
            <Paper>
              <Grid className={classes.grid} container item xs={12}>
                <form
                  className={classes.root}
                  noValidate
                  onSubmit={this.onSubmit}
                  autoComplete="off"
                >
                  <Grid className={classes.grid} container item xs={12}>
                    <Typography align="center" variant="h3" component="h4">
                      Add Product
                    </Typography>
                  </Grid>
                  <Grid className={classes.grid} container item xs={12}>
                    <Grid className={classes.grid} item xs={8}>
                      <img
                        className={classes.media}
                        // src={`data:image/png;base64,${this.state.user_img}`}
                        src={this.state.selectedFile}
                        alt=""
                      />
                    </Grid>
                    <Grid className={classes.grid} container item xs={8}>
                      <label htmlFor="upload-photo">
                        <input
                          accept="image/*"
                          style={{ display: "none" }}
                          id="upload-photo"
                          name="selectedFile"
                          type="file"
                          onChange={this.handleUploadClick}
                        />
                        <Button
                          color="secondary"
                          variant="contained"
                          component="span"
                        >
                          Upload button
                        </Button>
                      </label>
                      {/* <input
                        type="file"
                        name="selectedFile"
                        onChange={this.onChange}
                      />
                      <button type="submit">Submit</button> */}
                    </Grid>
                    <Grid className={classes.grid} item xs={12}>
                      <TextField
                        className={classes.textField}
                        type="text"
                        name="product_name"
                        value={this.state.product_name}
                        onChange={this.onChange}
                        label="ชื่อ"
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid className={classes.grid} item xs={12}>
                      <TextField
                        className={classes.textField}
                        type="text"
                        name="product_price"
                        value={this.state.product_price}
                        onChange={this.onChange}
                        label="ราคาต่อชิ้น"
                        variant="outlined"
                        fullWidth
                      />
                      <TextField
                        className={classes.textField}
                        type="text"
                        name="product_amount"
                        value={this.state.product_amount}
                        onChange={this.onChange}
                        label="จำนวน"
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <br />
                  </Grid>
                  <Grid className={classes.grid}>
                    <Button type="submit" variant="contained" color="primary">
                      Add Product
                    </Button>
                  </Grid>
                  <Typography align="center" variant="h5" component="h5">
                    {this.state.errorMessage !== "" ? (
                      <p>{this.state.errorMessage}</p>
                    ) : null}
                  </Typography>
                </form>
              </Grid>
            </Paper>
          </Container>
        </Container>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addProduct: (product) => dispatch(addProduct(product)),
  };
};
export default compose(
  withStyles(useStyles),
  connect(null, mapDispatchToProps)
)(AddProduct);

import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { getProfile, updateProfile } from "../../store/actions/profileActions";
import { Redirect } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import equal from "fast-deep-equal";

import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

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

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user_id: "",
      user_fname: "",
      user_lname: "",
      user_birthday: "",
      user_img: null,
      selectedFile: null,
      errorMessage: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.checkProfile = this.checkProfile.bind(this);
  }
  componentDidMount() {
    const token_decode = jwt_decode(localStorage.usertoken);
    // console.log(token_decode);
    this.props.getProfile(token_decode.user_id);
    if (this.props.profile) {
      this.checkProfile();
    }
  }

  componentDidUpdate(prevProps) {
    /*เช็คถ้า profile เปลี่ยน*/
    if (!equal(this.props.profile, prevProps.profile)) {
      this.checkProfile();
    }
  }
  checkProfile() {
    this.setState({
      user_id: this.props.profile.user_id,
      user_fname: this.props.profile.user_fname,
      user_lname: this.props.profile.user_lname,
      user_birthday: this.props.profile.user_birthday,
      user_img: "data:image/png;base64," + this.props.profile.user_img,
    });
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();

    const newProfile = {
      user_fname: this.state.user_fname,
      user_lname: this.state.user_lname,
      user_birthday: this.state.user_birthday,
      profile_img: this.state.selectedFile,
    };

    if (
      this.state.user_fname !== "" &&
      this.state.user_lname !== "" &&
      this.state.user_birthday !== ""
    ) {
      this.props.updateProfile(this.state.user_id, newProfile);
      // this.props.history.push(`/`);
    }
  }

  handleUploadClick = (event) => {
    var file = event.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);

      reader.onloadend = function (e) {
        this.setState({
          selectedFile: [reader.result],
        });
      }.bind(this);

      this.setState({
        selectedFile: event.target.files[0],
      });
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
                      Profile
                    </Typography>
                  </Grid>
                  <Grid className={classes.grid} container item xs={12}>
                    <Grid className={classes.grid} item xs={8}>
                      {this.state.selectedFile !== null ? (
                        <img
                          className={classes.media}
                          // src={`data:image/png;base64,${this.state.user_img}`}
                          src={this.state.selectedFile}
                          alt=""
                        />
                      ) : (
                        <img
                          className={classes.media}
                          // src={`data:image/png;base64,${this.state.user_img}`}
                          src={this.state.user_img}
                          alt=""
                        />
                      )}
                    </Grid>
                    <Grid className={classes.grid} container item xs={8}>
                      <label htmlFor="upload-photo">
                        <input
                          accept="image/*"
                          style={{ display: "none" }}
                          id="upload-photo"
                          name="upload-photo"
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
                    </Grid>
                    <Grid className={classes.grid} item xs={12}>
                      <TextField
                        className={classes.textField}
                        type="text"
                        name="user_fname"
                        value={this.state.user_fname}
                        onChange={this.onChange}
                        label="ชื่อ"
                        variant="outlined"
                        fullWidth
                      />
                      <TextField
                        className={classes.textField}
                        type="text"
                        name="user_lname"
                        value={this.state.user_lname}
                        onChange={this.onChange}
                        label="นามสกุล"
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    {/* <br />
                    <TextField
                      className={classes.textField}
                      type="text"
                      name="user_email"
                      value={this.state.user_email}
                      onChange={this.onChange}
                      label="อีเมล"
                      variant="outlined"
                      fullWidth
                    />
                    <br />
                    <TextField
                      className={classes.textField}
                      type="password"
                      name="user_pass"
                      value={this.state.user_pass}
                      onChange={this.onChange}
                      label="รหัสผ่าน"
                      variant="outlined"
                      fullWidth
                    /> */}
                    <br />
                    <Grid className={classes.grid} container item xs={12}>
                      <TextField
                        className={classes.textField}
                        id="date"
                        type="date"
                        name="user_birthday"
                        value={this.state.user_birthday}
                        onChange={this.onChange}
                        InputLabelProps={{ shrink: true, required: true }}
                        label="วันเกิด"
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                  <Grid className={classes.grid}>
                    <Button type="submit" variant="contained" color="primary">
                      Update
                    </Button>
                  </Grid>
                  <Typography align="center" variant="h5" component="h5">
                    {this.props.profileMessage !== "" ? (
                      <p>{this.props.profileMessage}</p>
                    ) : null}
                  </Typography>
                  {/* {this.props.profile !== null ? (
                    <>
                      <p>{this.props.profile.user_fname}</p>
                      <p>{this.props.profile.user_id}</p>
                    </>
                  ) : null} */}
                </form>
              </Grid>
            </Paper>
          </Container>
        </Container>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile.profile,
    profileMessage: state.profile.profileMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProfile: (id) => dispatch(getProfile(id)),
    updateProfile: (id, newProfile) => dispatch(updateProfile(id, newProfile)),
  };
};
export default compose(
  withStyles(useStyles),
  connect(mapStateToProps, mapDispatchToProps)
)(Profile);

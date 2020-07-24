import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { addUser } from "../../store/actions/userActions";
import { Redirect } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";

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
});

class AddUser extends Component {
  constructor() {
    super();
    this.state = {
      user_fname: "",
      user_lname: "",
      user_email: "",
      user_pass: "",
      user_birthday: "",
      error: {},
      errorMessage: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      user_fname: this.state.user_fname,
      user_lname: this.state.user_lname,
      user_email: this.state.user_email,
      user_pass: this.state.user_pass,
      user_birthday: this.state.user_birthday,
    };

    if (
      this.state.user_fname !== "" &&
      this.state.user_lname !== "" &&
      this.state.user_email !== "" &&
      this.state.user_pass !== "" &&
      this.state.user_birthday !== ""
    ) {
      // console.log(newUser)
      this.props.addUser(newUser);
      this.props.history.push(`/dashboard`);
    }
  }

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
                      AddUser
                    </Typography>
                  </Grid>
                  <Grid className={classes.grid} container item xs={12}>
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
                    <br />
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
                    />
                    <br />
                    <Grid className={classes.grid}>
                      <TextField
                        className={classes.textField}
                        id="date"
                        type="date"
                        name="user_birthday"
                        value={this.state.user_birthday}
                        onChange={this.onChange}
                        // defaultValue="2017-05-24"
                        label="วันเกิด"
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                  <Grid className={classes.grid}>
                    <Button type="submit" variant="contained" color="primary">
                      Add User
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
    addUser: (user) => dispatch(addUser(user)),
  };
};
export default compose(
  withStyles(useStyles),
  connect(null, mapDispatchToProps)
)(AddUser);

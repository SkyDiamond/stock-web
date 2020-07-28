import React, { Component } from "react";
import { login } from "../../store/actions/authActions";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import jwt_decode from 'jwt-decode'
//UI
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
    width: "30ch",
  },
});

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password,
    };

    if (this.state.email !== "" && this.state.password !== "") {
      // login(user).then((res) => {
      //   if (!res.error) {
      //     console.log(res.token)
      //     const token_decode = jwt_decode(res.token)
      //     console.log(token_decode);
      //     this.props.history.push(`/`);
      //   } else {
      //     this.setState({ errorMessage: res.error });
      //     console.log(res.error);
      //   }
      // });
      this.props.login(user);
      this.props.history.push(`/`);
    }
  }

  render() {
    const { classes, authError } = this.props;
    if (localStorage.usertoken) return <Redirect to="/" />;

    // console.log(authError);
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
                  <Typography align="center" variant="h3" component="h4">
                    Login
                  </Typography>
                  <TextField
                    className={classes.textField}
                    type="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    label="Email"
                    variant="outlined"
                    required
                    fullWidth
                  />
                  <br />
                  <TextField
                    className={classes.textField}
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    label="Password"
                    variant="outlined"
                    required
                    fullWidth
                  />
                  <br />
                  <Grid className={classes.grid}>
                    <Button type="submit" variant="contained" color="primary">
                      Sign in
                    </Button>
                  </Grid>
                  <Typography align="center" variant="h5" component="h5">
                    {authError !== null ? (
                      <p>{authError}</p>
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

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => dispatch(login(user)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  withStyles(useStyles)
)(Login);

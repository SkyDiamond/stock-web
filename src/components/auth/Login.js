import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
// import jwt_decode from 'jwt-decode'

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
      errorMessage: "",
    };
  }
  
  render() {
    const { classes } = this.props;

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

export default withStyles(useStyles)(Login);

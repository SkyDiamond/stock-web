import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { addUser } from "../../store/actions/userActions";
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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});

class AddUser extends Component {
  constructor() {
    super();
    this.state = {
      user_email: "",
      user_pass: "",
      job_position: "",
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
      user_email: this.state.user_email,
      user_pass: this.state.user_pass,
      job_position: this.state.job_position,
    };

    if (
      this.state.user_email !== "" &&
      this.state.user_pass !== "" &&
      this.state.job_position !== ""
    ) {
      // console.log(newUser)
      this.props.addUser(newUser);
      // if (this.props.userMessage === null) {
      this.props.history.push(`/dashboard`);
      // }
    }
  }

  render() {
    const { classes } = this.props;

    if (!localStorage.usertoken) return <Redirect to="/login" />;
    if(jwt_decode(localStorage.usertoken).job_position !== 'admin') return <Redirect to="/" />;

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
                        name="user_email"
                        value={this.state.user_email}
                        onChange={this.onChange}
                        label="อีเมล"
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <br />
                    <Grid className={classes.grid} item xs={12}>
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
                    </Grid>
                    <br />
                    <Grid className={classes.grid} item xs={12}>
                      <FormControl
                        variant="outlined"
                        className={classes.formControl}
                      >
                        <InputLabel id="demo-simple-select-outlined-label">
                          Age
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          value={this.state.job_position}
                          name="job_position"
                          onChange={this.onChange}
                          label="Position"
                        >
                          <MenuItem value={"staff"}>Staff</MenuItem>
                          <MenuItem value={"admin"}>Admin</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid className={classes.grid}>
                    <Button type="submit" variant="contained" color="primary">
                      Add User
                    </Button>
                  </Grid>
                  <Typography align="center" variant="h5" component="h5">
                    {this.props.userMessage !== "" ? (
                      <p>{this.props.userMessage}</p>
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
    userMessage: state.user.userMessage,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (user) => dispatch(addUser(user)),
  };
};
export default compose(
  withStyles(useStyles),
  connect(mapStateToProps, mapDispatchToProps)
)(AddUser);

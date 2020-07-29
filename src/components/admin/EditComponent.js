import React, { Component } from "react";
import {
  editUser,
  updateUser,
  deleteUser,
} from "../../store/actions/userActions";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
//UI
import {
  Container,
  TextField,
  IconButton,
  Grid,
  Typography,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import UpdateIcon from "@material-ui/icons/Update";

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

class EditComponent extends Component {
  constructor() {
    super();
    this.state = {
      user_email: "",
      user_pass: "",
      job_position: "",
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      user_email: this.props.user.user_email,
      job_position: this.props.user.job_position,
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onEdit = (val, e) => {
    e.preventDefault();
    this.props.editUser(val.user_id);
  };
  onUpdate = (val, e) => {
    e.preventDefault();
    this.props.updateUser(val.user_id, this.state);
  };

  render() {
    const { classes, user } = this.props;

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
                      Edit User
                    </Typography>
                  </Grid>
                  <Grid className={classes.grid} container item xs={12}>
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
                      type="text"
                      name="user_pass"
                      value={this.state.user_pass}
                      onChange={this.onChange}
                      label="รหัสผ่าน"
                      variant="outlined"
                      fullWidth
                    />
                    <br />
                    <Grid className={classes.grid} item xs={12}>
                      <FormControl
                        variant="outlined"
                        className={classes.formControl}
                      >
                        <InputLabel id="demo-simple-select-outlined-label">
                          ตำแหน่ง
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          value={this.state.job_position}
                          defaultValue={user.job_position}
                          name="job_position"
                          onChange={this.onChange}
                          label="Position"
                        >
                          <MenuItem value={"admin"}>Admin</MenuItem>
                          <MenuItem value={"staff"}>Staff</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid className={classes.grid}>
                    <IconButton onClick={this.onUpdate.bind(this, user)}>
                      <UpdateIcon />
                    </IconButton>
                    <IconButton onClick={this.onEdit.bind(this, user)}>
                      <CloseIcon />
                    </IconButton>
                  </Grid>
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
    editUser: (id) => dispatch(editUser(id)),
    updateUser: (id, data) => dispatch(updateUser(id, data)),
    deleteUser: (id) => dispatch(deleteUser(id)),
  };
};
export default compose(
  connect(null, mapDispatchToProps),
  withRouter,
  withStyles(useStyles)
)(EditComponent);

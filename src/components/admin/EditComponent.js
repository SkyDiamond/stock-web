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
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import UpdateIcon from "@material-ui/icons/Update";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";

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

class EditComponent extends Component {
  constructor() {
    super();
    this.state = {
      user_fname: "",
      user_lname: "",
      user_email: "",
      error: {},
      errorMessage: "",
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      user_fname: this.props.user.user_fname,
      user_lname: this.props.user.user_lname,
      user_email: this.props.user.user_email,
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
                    {/* <TextField
                      className={classes.textField}
                      multiline
                      rows={4}
                      type="text"
                      name="user_detail"
                      value={this.state.user_detail}
                      onChange={this.onChange}
                      label="รายละเอียดกิจกรรม"
                      variant="outlined"
                      fullWidth
                    />
                    <br /> */}
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

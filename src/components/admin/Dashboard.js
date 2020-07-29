import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter, Redirect, Link } from "react-router-dom";
import { getUser } from "../../store/actions/userActions";
import { compose } from "redux";
import jwt_decode from "jwt-decode";

//UI
import { Container, Paper, Grid, Typography, Button } from "@material-ui/core";
import UsersTable from "./UsersTable";
import EditComponent from "./EditComponent";

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
  addbtn: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginRight: theme.spacing(2),
  },
});

class Dashboard extends Component {
  componentDidMount() {
    this.props.getUser();
  }

  render() {
    const { classes, users, editMode } = this.props;

    if (!localStorage.usertoken) return <Redirect to="/login" />;
    if(jwt_decode(localStorage.usertoken).job_position !== 'admin') return <Redirect to="/" />;

    return (
      <React.Fragment>
        <Container maxWidth="xl" className={classes.cont}>
          <Container maxWidth="lg">
            <Paper>
              <Grid className={classes.grid} container item xs={12}>
                {users &&
                  users.map((user) =>
                    user.user_editing ? (
                      <EditComponent key={user.user_id} user={user} />
                    ) : null
                  )}
                {!editMode ? (
                  <>
                    <>
                      <Grid className={classes.grid} item xs={12}>
                        <Typography align="center" variant="h3" component="h4">
                          Dashboard
                        </Typography>
                      </Grid>
                      <Grid className={classes.addbtn} item xs={12}>
                        {/* <IconButton component={Link} to="/adduser">
                          <AddCircle />
                        </IconButton> */}
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          component={Link}
                          to="/adduser"
                        >
                          Add User
                        </Button>
                      </Grid>
                    </>
                    <UsersTable />
                  </>
                ) : null}
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
    users: state.user.users,
    editMode: state.user.editmode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: () => dispatch(getUser()),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  withStyles(useStyles)
)(Dashboard);

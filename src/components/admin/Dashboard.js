import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter, Redirect,Link } from "react-router-dom";
import { getUser } from "../../store/actions/userActions";
import { compose } from "redux";

//UI
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import UsersTable from "./UsersTable";
import EditComponent from "./EditComponent";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";

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
  addbtn:{
    marginRight: theme.spacing(2),
  }
});

class Dashboard extends Component {
  componentDidMount() {
    this.props.getUser();
  }

  render() {
    const { classes, users, editMode } = this.props;

    if (!localStorage.usertoken) return <Redirect to="/login" />;

    return (
      <React.Fragment>
        <Container maxWidth="xl" className={classes.cont}>
          <Container maxWidth="lg">
            <Paper>
              <Grid className={classes.grid} container item xs={12}>
                {users.map((user) =>
                  user.user_editing ? (
                    <EditComponent key={user.user_id} user={user} />
                  ) : null
                )}
                {!editMode ? (
                  <>
                    <Typography align="center" variant="h3" component="h4">
                      Dashboard
                    </Typography>

                    <IconButton component={Link} to="/adduser">
                      <EditIcon />
                    </IconButton>
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
    users: state.users,
    editMode: state.editmode,
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

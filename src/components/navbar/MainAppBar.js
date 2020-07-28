import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../store/actions/authActions";

//UI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Home from "@material-ui/icons/Home";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AccountCircle from "@material-ui/icons/AccountCircle";

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
});

class MainAppBar extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
  }

  logOut(e) {
    e.preventDefault();
    this.props.logout();
    // localStorage.removeItem("usertoken");
    this.props.history.push(`/login`);
  }

  toggleDrawer() {
    this.setState({
      open: !this.state.open,
    });
  }
  render() {
    const { classes } = this.props;

    const guestLink = () => (
      <div
        className={classes.list}
        role="presentation"
        onClick={this.toggleDrawer.bind(this)}
        onKeyDown={this.toggleDrawer.bind(this)}
      >
        <Grid>
          <Typography align="center" variant="h4" component="h4">
            Menu
          </Typography>
        </Grid>
        <Divider />
        <List>
          <ListItem button component={Link} to="/">
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItem>
          <ListItem button component={Link} to="/login">
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary={"Login"} />
          </ListItem>
        </List>
      </div>
    );

    const userLink = () => (
      <div
        className={classes.list}
        role="presentation"
        onClick={this.toggleDrawer.bind(this)}
        onKeyDown={this.toggleDrawer.bind(this)}
      >
        <Grid>
          <Typography align="center" variant="h4" component="h4">
            Menu
          </Typography>
        </Grid>
        <Divider />
        <List>
          <ListItem button component={Link} to="/">
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItem>
          <ListItem button component={Link} to="/dashboard">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary={"Dashboard"} />
          </ListItem>
          <ListItem button component={Link} to="/profile">
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary={"Profile"} />
          </ListItem>
          <ListItem button onClick={this.logOut.bind(this)}>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItem>
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={this.toggleDrawer.bind(this)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Inventory management
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          open={this.state.open}
          // onToggleDrawer={this.toggleDrawer.bind(this)}
          onClose={this.toggleDrawer.bind(this)}
        >
          {localStorage.usertoken ? userLink() : guestLink()}
        </Drawer>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default compose(
  withRouter,
  withStyles(useStyles),
  connect(null, mapDispatchToProps)
)(MainAppBar);

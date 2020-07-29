import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect, Link } from "react-router-dom";
import ProductList from "./ProductList";
import { Typography, Button, Paper, Grid, Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  pad: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  grid: {
    padding: theme.spacing(2),
  },
  addbtn: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginRight: theme.spacing(2),
  },
}));

export default function Main() {
  const classes = useStyles();
  if (!localStorage.usertoken) return <Redirect to="/login" />;
  return (
    <React.Fragment>
      <Container
        maxWidth={false}
        style={{ backgroundColor: "#cfe8fc", height: "100vh" }}
        className={classes.grid}
      >
        <Container maxWidth="lg">
          <Paper className={classes.root}>
            <Grid className={classes.pad}>
              <Typography align="center" variant="h3" component="h4">
                Inventory 
              </Typography>
            </Grid>
            <Grid className={classes.addbtn} item xs={12}>
              {/* <IconButton component={Link} to="/adduser">
                          <AddCircle />
                        </IconButton> */}
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/addproduct"
              >
                Add Product
              </Button>
            </Grid>
            <Grid>
              <ProductList />
            </Grid>
          </Paper>
        </Container>
      </Container>
    </React.Fragment>
  );
}

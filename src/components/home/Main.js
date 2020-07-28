import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import ProductList from "./ProductList";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";

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
}));

export default function Main() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Container
        maxWidth="xl"
        style={{ backgroundColor: "#cfe8fc", height: '100vh' }}
        className={classes.grid}
      >
        <Container maxWidth="lg">
          <Paper className={classes.root}>
            <Grid className={classes.pad}>
              <Typography align="center" variant="h3" component="h4">
                Inventory
              </Typography>
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

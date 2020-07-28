import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
//UI
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableComponent from "./TableComponent";
import TableBody from "@material-ui/core/TableBody";

const useStyles = (theme) => ({
  table: {
    minWidth: 300,
  },
});

class UsersTable extends Component {
  render() {
    const { classes, users } = this.props;

    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {/* <TableCell>ชื่อ-นามสกุล</TableCell> */}
              <TableCell align="center">อีเมล</TableCell>
              <TableCell align="center">แก้ไขเมื่อ</TableCell>
              <TableCell align="center">แก้ไข/ลบ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users && users.map((user) => (
              <TableRow key={user.user_id}>
                {user.user_editing ? null : <TableComponent user={user} />}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* <TablePagination rowsPerPageOptions={[10, 50]} /> */}
      </TableContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.user.users,
  };
};

export default compose(
  connect(mapStateToProps),
  withRouter,
  withStyles(useStyles)
)(UsersTable);

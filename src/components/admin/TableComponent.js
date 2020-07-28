import React, { Component } from "react";
import { deleteUser, editUser } from "../../store/actions/userActions";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import * as moment from "moment";
//UI
import TableCell from "@material-ui/core/TableCell";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";

const useStyles = (theme) => ({
  table: {
    minWidth: 300,
  },
});

class TableComponent extends Component {
  onDelete = (val, e) => {
    e.preventDefault();
    this.props.deleteUser(val.user_id);
  };

  onEdit = (val, e) => {
    e.preventDefault();
    this.props.editUser(val.user_id);
  };

  render() {
    const { user } = this.props;

    return (
      <>
        {/* <TableCell component="th" scope="row">
          {user.user_fname} {user.user_lname}
        </TableCell> */}
        <TableCell align="center">{user.user_email}</TableCell>
        <TableCell align="center">
          {moment(user.user_created).fromNow()}
        </TableCell>
        <TableCell align="center">
          <IconButton onClick={this.onEdit.bind(this, user)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={this.onDelete.bind(this, user)}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteUser: (id) => dispatch(deleteUser(id)),
    editUser: (id) => dispatch(editUser(id)),
  };
};
export default compose(
  connect(null, mapDispatchToProps),
  withRouter,
  withStyles(useStyles)
)(TableComponent);

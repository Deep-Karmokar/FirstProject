import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    position: "relative"
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing.unit * 4,
    right: theme.spacing.unit * 4
  }
});

class AddPostFabButton extends Component {
  render() {
    return (
      <div className={this.props.classes.root}>
        <Link to="/addPosts">
          <Fab className={this.props.classes.fab} color="secondary">
            <AddIcon />
          </Fab>
        </Link>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(AddPostFabButton);

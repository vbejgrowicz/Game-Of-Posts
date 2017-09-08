/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import { openCommentForm, updateParentID, updateCommentID, isExistingComment } from '../../actions/EditCommentAction';
import { makeID, uniqueID } from '../../utils/MakeID';


class AddCommentButton extends React.Component {

  render() {
    var IDsUsed = this.props.IDsUsed;
    return (
      <div className="Add-Comment">
        <button onClick={() => this.props.openCommentForm(IDsUsed, this.props.parentId)}>Add Comment</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    IDsUsed: state.commentsReducer.IDsUsed,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    openCommentForm: (IDsUsed, parentId) => {
      var newID = makeID();
      var id = uniqueID(newID, IDsUsed);
      dispatch(updateCommentID(id));
      dispatch(updateParentID(parentId));
      dispatch(openCommentForm());
      dispatch(isExistingComment(false));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCommentButton);

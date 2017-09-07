/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import { fetchAllIDs } from '../../actions/CommentsAction';
import { openCommentForm, updateParentID, updateID, isExistingComment } from '../../actions/EditCommentAction';
import { makeID, uniqueID } from '../../utils/MakeID';


class AddCommentButton extends React.Component {

  componentDidMount() {
    this.props.fetchAllIDs(this.props.parentId);
  }

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
      console.log(id);
      dispatch(updateID(id));
      dispatch(updateParentID(parentId));
      dispatch(openCommentForm());
      dispatch(isExistingComment(false));
    },
    fetchAllIDs: () => {
      dispatch(fetchAllIDs());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCommentButton);

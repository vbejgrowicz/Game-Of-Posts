/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import { openCommentForm, updateParentID, updateID, isExistingComment, updateBody, updateAuthor } from '../../actions/EditCommentAction';

class EditCommentButton extends React.Component {

  render() {
    return (
      <div className="Edit-Comment">
        <button onClick={() => this.props.openCommentForm(this.props.parentId, this.props.id, this.props.body, this.props.author)}>Edit Comment</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    openCommentForm: (parentId, id, body, author) => {
      dispatch(updateParentID(parentId));
      dispatch(updateID(id));
      dispatch(updateBody(body));
      dispatch(updateAuthor(author));
      dispatch(isExistingComment(true));
      dispatch(openCommentForm());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCommentButton);

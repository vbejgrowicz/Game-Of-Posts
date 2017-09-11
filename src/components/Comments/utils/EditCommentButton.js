/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { openCommentForm, updateParentID, updateCommentID, isExistingComment, updateCommentBody, updateCommentAuthor } from '../../../actions/EditCommentAction';

class EditCommentButton extends React.Component {

  render() {
    const { openCommentForm, parentId, id, body, author } = this.props;
    return (
      <Button onClick={() => openCommentForm(parentId, id, body, author)}>Edit Comment</Button>
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
      dispatch(updateCommentID(id));
      dispatch(updateCommentBody(body));
      dispatch(updateCommentAuthor(author));
      dispatch(isExistingComment(true));
      dispatch(openCommentForm());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCommentButton);

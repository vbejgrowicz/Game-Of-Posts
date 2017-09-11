/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import { Modal, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { closeCommentForm, updateCommentBody, updateCommentAuthor } from '../../actions/EditCommentAction';
import SubmitNewCommentButton from './utils/SubmitNewCommentButton';
import SubmitEditCommentButton from './utils/SubmitEditCommentButton';

class CommentForm extends React.Component {

  render() {
    const { commentFormOpen, closeCommentForm, isExistingComment, body, updateCommentBody, author, updateCommentAuthor } = this.props;
    return (
      <Modal show={commentFormOpen} onHide={() => closeCommentForm()}>
        <Modal.Header closeButton>
          {(isExistingComment === true) ? (
            <Modal.Title>Edit Comment</Modal.Title>
          ):(
            <Modal.Title>Add New Comment</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <FormGroup controlId = 'formControlsBody'>
            <ControlLabel>Body</ControlLabel>
            <FormControl
              type="text"
              value={body}
              placeholder="Enter Body"
              onChange= {(e) => updateCommentBody(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId = 'formControlsAuthor'>
            <ControlLabel>Author</ControlLabel>
            <FormControl
              disabled={isExistingComment}
              type="text"
              value={author}
              placeholder="Enter Author"
              onChange= {(e) => updateCommentAuthor(e.target.value)}
            />
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          {(isExistingComment === true) ? (
            <SubmitEditCommentButton />
          ):(
            <SubmitNewCommentButton />
          )}
        </Modal.Footer>
      </Modal>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    commentFormOpen: state.EditCommentReducer.commentFormOpen,
    body: state.EditCommentReducer.comment.body,
    author: state.EditCommentReducer.comment.author,
    isExistingComment: state.EditCommentReducer.comment.isExistingComment

  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateCommentBody: (value) => dispatch(updateCommentBody(value)),
    updateCommentAuthor: (value) => dispatch(updateCommentAuthor(value)),
    closeCommentForm: () => dispatch(closeCommentForm()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);

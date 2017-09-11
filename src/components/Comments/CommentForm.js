/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import { Modal, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { closeCommentForm, updateCommentBody, updateCommentAuthor } from '../../actions/EditCommentAction';
import SubmitNewCommentButton from './utils/SubmitNewCommentButton';
import SubmitEditCommentButton from './utils/SubmitEditCommentButton';

class CommentForm extends React.Component {

  render() {
    return (
      <Modal show={this.props.commentFormOpen} onHide={() => this.props.closeCommentForm()}>
        <Modal.Header closeButton>
          {(this.props.isExistingComment === true) ? (
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
              value={this.props.body}
              placeholder="Enter Body"
              onChange= {(e) => this.props.updateCommentBody(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId = 'formControlsAuthor'>
            <ControlLabel>Author</ControlLabel>
            <FormControl
              disabled={this.props.isExistingComment}
              type="text"
              value={this.props.author}
              placeholder="Enter Author"
              onChange= {(e) => this.props.updateCommentAuthor(e.target.value)}
            />
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          {(this.props.isExistingComment === true) ? (
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

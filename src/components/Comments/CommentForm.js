/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import { Modal, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { closeCommentForm, updateCommentBody, updateCommentAuthor } from '../../actions/EditCommentAction';
import SubmitNewCommentButton from './utils/SubmitNewCommentButton';
import SubmitEditCommentButton from './utils/SubmitEditCommentButton';

class CommentForm extends React.Component {

  CommentValidationText(text) {
    if (text.length > 0) return null;
    else return 'error';
  }

  getCommentValidation(type, body, author) {
    if (type === "new") {
      const status = [this.CommentValidationText(body), this.CommentValidationText(author)];
        return status.includes("error");
    }
    else if (type === "edit") {
      const status = [this.CommentValidationText(body)];
        return status.includes("error");
    }
    console.log("validation error");
    return false;
  }


  render() {
    const { commentFormOpen } = this.props.EditCommentReducer;
    const { isExistingComment, body, author } = this.props.EditCommentReducer.comment;
    const { closeCommentForm, updateCommentBody, updateCommentAuthor } = this.props;
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
          <FormGroup controlId = 'formControlsBody' validationState={this.CommentValidationText(body)}>
            <ControlLabel>Body</ControlLabel>
            <FormControl
              type="text"
              value={body}
              placeholder="Enter Body"
              onChange= {(e) => updateCommentBody(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId = 'formControlsAuthor' validationState={this.CommentValidationText(author)}>
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
            <SubmitEditCommentButton editCommentValidationCheck={this.getCommentValidation("edit", body)}/>
          ):(
            <SubmitNewCommentButton newCommentValidationCheck={this.getCommentValidation("new", body, author)}/>
          )}
        </Modal.Footer>
      </Modal>
    );
  }
}

function mapStateToProps({ EditCommentReducer }) {
  return { EditCommentReducer };
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCommentBody: (value) => dispatch(updateCommentBody(value)),
    updateCommentAuthor: (value) => dispatch(updateCommentAuthor(value)),
    closeCommentForm: () => dispatch(closeCommentForm()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);

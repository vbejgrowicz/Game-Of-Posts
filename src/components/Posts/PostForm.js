/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import { Modal, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import {closePostForm, updateTitle, updateBody, updateAuthor, updateCategory } from '../../actions/EditPostAction';
import SubmitNewPostButton from './utils/SubmitNewPostButton';
import SubmitEditPostButton from './utils/SubmitEditPostButton';

class PostForm extends React.Component {

  PostValidationText(text) {
    if (text.length > 0) return null;
    else if (text.length === 0) return 'error';
  }

  PostValidationCategory(category) {
    if (category === "react") return null;
    else if (category === "redux") return null;
    else if (category === "udacity") return null;
    else return 'error';
  }

  getPostValidation(title, body, author, category) {
    const postStatus = [this.PostValidationText(title), this.PostValidationText(body), this.PostValidationText(author), this.PostValidationCategory(category)];
    return postStatus.includes("error");
  }

  render() {
    const { postFormOpen, closePostForm, isExistingPost, title, updateTitle, body, updateBody, author, updateAuthor, category, updateCategory } = this.props;
    return(
      <Modal show={postFormOpen} onHide={() => closePostForm()}>
        <Modal.Header closeButton>
          {(isExistingPost === true) ? (
            <Modal.Title>Edit Post</Modal.Title>
          ):(
            <Modal.Title>Add New Post</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <FormGroup controlId = 'formControlsTitle' validationState={this.PostValidationText(title)}>
            <ControlLabel>Title</ControlLabel>
            <FormControl
              type="text"
              value={title}
              placeholder="Enter Title"
              onChange= {(e) => updateTitle(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId = 'formControlsBody' validationState={this.PostValidationText(body)}>
            <ControlLabel>Body</ControlLabel>
            <FormControl
              type="text"
              value={body}
              placeholder="Enter Body"
              onChange= {(e) => updateBody(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId = 'formControlsAuthor' validationState={this.PostValidationText(author)}>
            <ControlLabel>Author</ControlLabel>
            <FormControl
              disabled={isExistingPost}
              type="text"
              value={author}
              placeholder="Enter Author"
              onChange= {(e) => updateAuthor(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId = 'formControlsCategory' validationState={this.PostValidationCategory(category)}>
            <ControlLabel>Category</ControlLabel>
            <FormControl componentClass="select" disabled={isExistingPost} value={category} onChange={(e) => updateCategory(e.target.value)}>
              <option value="selector">Select Category...</option>
              <option value="react">React</option>
              <option value="redux">Redux</option>
              <option value="udacity">Udacity</option>
            </FormControl>
            <FormControl.Feedback />
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          {(isExistingPost === true) ? (
            <SubmitEditPostButton editPostValidationCheck={this.getPostValidation(title, body, author, category)} />
          ):(
            <SubmitNewPostButton newPostValidationCheck={this.getPostValidation(title, body, author, category)} />
          )}
        </Modal.Footer>
      </Modal>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    postFormOpen: state.EditPostReducer.postFormOpen,
    IDsUsed: state.postsReducer.IDsUsed,
    id: state.EditPostReducer.post.id,
    title: state.EditPostReducer.post.title,
    body: state.EditPostReducer.post.body,
    author: state.EditPostReducer.post.author,
    category: state.EditPostReducer.post.category,
    isExistingPost: state.EditPostReducer.post.isExistingPost

  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateTitle: (value) => dispatch(updateTitle(value)),
    updateBody: (value) => dispatch(updateBody(value)),
    updateAuthor: (value) => dispatch(updateAuthor(value)),
    updateCategory: (value) => dispatch(updateCategory(value)),
    closePostForm: () => dispatch(closePostForm()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);

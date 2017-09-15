/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import { Capitalize } from '../../utils/Capitalize';
import { Modal, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import {closePostForm, updateTitle, updateBody, updateAuthor, updateCategory } from '../../actions/EditPostAction';
import SubmitNewPostButton from './utils/SubmitNewPostButton';
import SubmitEditPostButton from './utils/SubmitEditPostButton';

class PostForm extends React.Component {

  PostValidationText(text) {
    if (text.length > 0) return null;
    else return 'error';
  }

  PostValidationCategory(category) {
    if (this.props.categories.includes(category)) return null;
    else return 'error';
  }

  getPostValidation(type, title, body, author, category) {
    if (type === "new") {
      const postStatus = [this.PostValidationText(title), this.PostValidationText(body), this.PostValidationText(author), this.PostValidationCategory(category)];
        return postStatus.includes("error");
    }
    else if (type === "edit") {
      const postStatus = [this.PostValidationText(title), this.PostValidationText(body)];
        return postStatus.includes("error");
    }
    console.log("validation error");
    return false;
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
              <option value="selector">Select a Category...</option>
              {this.props.categories.map((categoryItem, idx) => {
                return(
                  <option key={idx} value={categoryItem}>{Capitalize(categoryItem)}</option>
                );
              })}
            </FormControl>
            <FormControl.Feedback />
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          {(isExistingPost === true) ? (
            <SubmitEditPostButton editPostValidationCheck={this.getPostValidation("edit", title, body)} />
          ):(
            <SubmitNewPostButton newPostValidationCheck={this.getPostValidation("new", title, body, author, category)} />
          )}
        </Modal.Footer>
      </Modal>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    categories: state.categoriesReducer.categories,
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

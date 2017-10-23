/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import { Modal, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { closePostForm, updateTitle, updateBody, updateAuthor, updateCategory } from '../../actions/EditPostAction';
import { editPost, newPost } from '../../actions/PostsAction';
import CustomButton from '../utils/CustomButton';

class PostForm extends React.Component {

  PostValidationText(text) {
    if (text.length > 0) return null;
    else return 'error';
  }

  PostValidationCategory(category) {
    const { categories } = this.props.categoriesReducer;
    if (categories.includes(category)) return null;
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
    const { id, title, body, author, category, isExistingPost } = this.props.EditPostReducer.post;
    const { postFormOpen } = this.props.EditPostReducer;
    const { categories } = this.props.categoriesReducer;
    const {closePostForm, updateTitle, updateBody, updateAuthor, updateCategory, activeViewReducer, editPost, newPost } = this.props;
    const { activeView } = activeViewReducer;
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
              {categories.map((categoryItem, idx) => {
                return(
                  <option key={idx} value={categoryItem}>{categoryItem}</option>
                );
              })}
            </FormControl>
            <FormControl.Feedback />
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          {(isExistingPost === true) ? (
            <CustomButton disabled={this.getPostValidation("edit", title, body)} onPress={editPost.bind(this, id, title, body)}>Submit Changes</CustomButton>
          ):(
            <CustomButton disabled={this.getPostValidation("new", title, body, author, category)} onPress={newPost.bind(this, activeView, id, Date.now(), title, body, author, category)}>Submit</CustomButton>
          )}
        </Modal.Footer>
      </Modal>
    );
  }
}


function mapStateToProps({ categoriesReducer, EditPostReducer, activeViewReducer }) {
  return { categoriesReducer, EditPostReducer, activeViewReducer };
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateTitle: (value) => dispatch(updateTitle(value)),
    updateBody: (value) => dispatch(updateBody(value)),
    updateAuthor: (value) => dispatch(updateAuthor(value)),
    updateCategory: (value) => dispatch(updateCategory(value)),
    closePostForm: () => dispatch(closePostForm()),
    editPost: (id, title, body) => {
      dispatch(editPost(id,title,body));
      dispatch(closePostForm());
    },
    newPost: (activeView, id, timestamp, title, body, author, category) => {
      dispatch(newPost(activeView, id, timestamp, title, body, author, category));
      dispatch(closePostForm());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);

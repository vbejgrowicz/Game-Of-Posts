/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import { Modal, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import {closePostForm, updateTitle, updateBody, updateAuthor, updateCategory } from '../actions/EditPostAction';
import SubmitNewPostButton from './utils/SubmitNewPostButton';
import SubmitEditPostButton from './utils/SubmitEditPostButton';

class PostForm extends React.Component {

  render() {
    return(
      <Modal show={this.props.postFormOpen} onHide={() => this.props.closePostForm()}>
        <Modal.Header closeButton>
          {(this.props.isExistingPost === true) ? (
            <Modal.Title>Edit Post</Modal.Title>
          ):(
            <Modal.Title>Add New Post</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <FormGroup controlId = 'formControlsTitle'>
            <ControlLabel>Title</ControlLabel>
            <FormControl
              type="text"
              value={this.props.title}
              placeholder="Enter Title"
              onChange= {(e) => this.props.updateTitle(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId = 'formControlsBody'>
            <ControlLabel>Body</ControlLabel>
            <FormControl
              type="text"
              value={this.props.body}
              placeholder="Enter Body"
              onChange= {(e) => this.props.updateBody(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId = 'formControlsAuthor'>
            <ControlLabel>Author</ControlLabel>
            <FormControl
              disabled={this.props.isExistingPost}
              type="text"
              value={this.props.author}
              placeholder="Enter Author"
              onChange= {(e) => this.props.updateAuthor(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId = 'formControlsCategory'>
            <ControlLabel>Category</ControlLabel>
            <FormControl componentClass="select" disabled={this.props.isExistingPost} value={this.props.category} onChange={(e) => this.props.updateCategory(e.target.value)}>
              <option value="" hidden>Select Category...</option>
              <option value="react">React</option>
              <option value="redux">Redux</option>
              <option value="udacity">Udacity</option>
            </FormControl>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          {(this.props.isExistingPost === true) ? (
            <SubmitEditPostButton />
          ):(
            <SubmitNewPostButton />
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

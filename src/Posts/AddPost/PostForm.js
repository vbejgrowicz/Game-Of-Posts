/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import {closePostForm, updateTitle, updateBody, updateAuthor, updateCategory } from '../../actions/EditPostAction';
import { editPost, newPost } from '../../actions/PostsAction';
import { makeID, uniqueID } from '../../utils/MakeID';

class PostForm extends React.Component {


  render() {
    console.log(this.props.isExistingPost);
    var newID = makeID();
    var IDsUsed = this.props.IDsUsed;
    var timestamp = Date.now();
    return this.props.postFormOpen ? (
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
              type="text"
              value={this.props.author}
              placeholder="Enter Author"
              onChange= {(e) => this.props.updateAuthor(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId = 'formControlsCategory'>
            <ControlLabel>Category</ControlLabel>
            <FormControl componentClass="select" value={this.props.category} onChange={(e) => this.props.updateCategory(e.target.value)}>
              <option value="" hidden>Select Category...</option>
              <option value="react">React</option>
              <option value="redux">Redux</option>
              <option value="udacity">Udacity</option>
            </FormControl>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          {(this.props.isExistingPost === true) ? (
            <Button onClick={()=>this.props.editPost(this.props.id, this.props.title, this.props.body)}>Submit Changes</Button>
          ):(
            <Button onClick={()=>this.props.newPost(newID, IDsUsed, timestamp, this.props.title, this.props.body, this.props.author, this.props.category)}>Submit</Button>
          )}
        </Modal.Footer>
      </Modal>
    ):null;
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
    newPost: (newID, IDsUsed, timestamp, title, body, author, category) => {
      var id = uniqueID(newID, IDsUsed);
      dispatch(newPost(id, timestamp, title, body, author, category));
      dispatch(closePostForm());
    },
    editPost: (id, title, body) => {
      dispatch(editPost(id,title,body));
      dispatch(closePostForm());
    },
    closePostForm: () => dispatch(closePostForm()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);

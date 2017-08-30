/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { newPost, closePostForm } from './actions/PostsAction';

class PostForm extends React.Component {

  render() {
    var id = '0xf0y6ziyjabvozdd253zz';
    var timestamp = Date.now();
    var title = 'New Title';
    var body = 'New Body';
    var author = 'New Author';
    var category = 'udacity';
    return this.props.postFormOpen ? (
      <Modal show={this.props.postFormOpen} onHide={() => this.props.closePostForm()}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup controlId = 'formControlsTitle'>
            <ControlLabel>Title</ControlLabel>
            <FormControl
              type="text"
              placeholder="Enter Title"
            />
          </FormGroup>
          <FormGroup controlId = 'formControlsBody'>
            <ControlLabel>Body</ControlLabel>
            <FormControl
              type="text"
              placeholder="Enter Body"
            />
          </FormGroup>
          <FormGroup controlId = 'formControlsAuthor'>
            <ControlLabel>Author</ControlLabel>
            <FormControl
              type="text"
              placeholder="Enter Author"
            />
          </FormGroup>
          <FormGroup controlId = 'formControlsCategory'>
            <ControlLabel>Category</ControlLabel>
            <FormControl componentClass="select" placeholder="">
              <option value="">Select</option>
              <option value="react">React</option>
              <option value="redux">Redux</option>
              <option value="udacity">Udacity</option>
            </FormControl>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={()=>this.props.newPost(id, timestamp, title, body, author, category)}>Submit</Button>
        </Modal.Footer>
      </Modal>
    ):null;
  }
}


const mapStateToProps = (state) => {
  return {
    postFormOpen: state.postsReducer.postFormOpen,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    newPost: (id, timestamp, title, body, author, category) => {
      dispatch(newPost(id, timestamp, title, body, author, category));
      dispatch(closePostForm());
    },
    closePostForm: () => dispatch(closePostForm()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);

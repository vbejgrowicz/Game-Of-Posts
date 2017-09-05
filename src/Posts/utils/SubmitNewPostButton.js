/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { closePostForm } from '../../actions/EditPostAction';
import { newPost } from '../../actions/PostsAction';

class SubmitNewPostButton extends React.Component {

  render() {
    return(
      <Button onClick={()=>this.props.newPost(this.props.id, Date.now(), this.props.title, this.props.body, this.props.author, this.props.category)}>Submit</Button>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    id: state.EditPostReducer.post.id,
    title: state.EditPostReducer.post.title,
    body: state.EditPostReducer.post.body,
    author: state.EditPostReducer.post.author,
    category: state.EditPostReducer.post.category,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    newPost: (id, timestamp, title, body, author, category) => {
      dispatch(newPost(id, timestamp, title, body, author, category));
      dispatch(closePostForm());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmitNewPostButton);

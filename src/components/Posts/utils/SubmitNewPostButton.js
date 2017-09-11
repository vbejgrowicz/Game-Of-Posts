/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { closePostForm } from '../../../actions/EditPostAction';
import { newPost } from '../../../actions/PostsAction';

class SubmitNewPostButton extends React.Component {

  render() {
    const { newPost, activeView, id, title, body, author, category } = this.props;
    return(
      <Button onClick={()=> newPost(activeView, id, Date.now(), title, body, author, category)}>Submit</Button>
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
    activeView: state.activeViewReducer.category,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    newPost: (activeView, id, timestamp, title, body, author, category) => {
      dispatch(newPost(activeView, id, timestamp, title, body, author, category));
      dispatch(closePostForm());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmitNewPostButton);

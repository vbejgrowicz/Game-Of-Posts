/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { closePostForm } from '../../../actions/EditPostAction';
import { editPost } from '../../../actions/PostsAction';

class SubmitEditPostButton extends React.Component {

  render() {
    return(
      <Button onClick={()=>this.props.editPost(this.props.id, this.props.title, this.props.body)}>Submit Changes</Button>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    id: state.EditPostReducer.post.id,
    title: state.EditPostReducer.post.title,
    body: state.EditPostReducer.post.body,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    editPost: (id, title, body) => {
      dispatch(editPost(id,title,body));
      dispatch(closePostForm());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmitEditPostButton);

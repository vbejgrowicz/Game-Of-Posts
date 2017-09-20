/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { closePostForm } from '../../../actions/EditPostAction';
import { newPost } from '../../../actions/PostsAction';

class SubmitNewPostButton extends React.Component {

  render() {
    const { id, title, body, author, category } = this.props.EditPostReducer.post;
    const { activeView } = this.props.activeViewReducer;
    const { newPost } = this.props;

    return(
      <Button disabled={this.props.newPostValidationCheck} onClick={()=> newPost(activeView, id, Date.now(), title, body, author, category)}>Submit</Button>
    );
  }
}

function mapStateToProps({ EditPostReducer, activeViewReducer }) {
  return { EditPostReducer, activeViewReducer };
}

const mapDispatchToProps = (dispatch) => {
  return {
    newPost: (activeView, id, timestamp, title, body, author, category) => {
      dispatch(newPost(activeView, id, timestamp, title, body, author, category));
      dispatch(closePostForm());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmitNewPostButton);

/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { closePostForm } from '../../../actions/EditPostAction';
import { editPost } from '../../../actions/PostsAction';

class SubmitEditPostButton extends React.Component {

  render() {
    const { editPost } = this.props;
    const { id, title, body } = this.props.EditPostReducer.post;
    return(
      <Button disabled={this.props.editPostValidationCheck} onClick={()=> editPost(id, title, body)}>Submit Changes</Button>
    );
  }
}

function mapStateToProps({ EditPostReducer }) {
  return { EditPostReducer };
}

const mapDispatchToProps = (dispatch) => {
  return {
    editPost: (id, title, body) => {
      dispatch(editPost(id,title,body));
      dispatch(closePostForm());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmitEditPostButton);

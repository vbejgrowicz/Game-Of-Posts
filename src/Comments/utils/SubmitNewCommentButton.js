/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { closeCommentForm } from '../../actions/EditCommentAction';
import { newComment } from '../../actions/CommentsAction';

class SubmitNewCommentButton extends React.Component {

  render() {
    return(
      <Button onClick={()=>this.props.newComment(this.props.id, Date.now(), this.props.body, this.props.author, this.props.parentId)}>Submit</Button>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    id: state.EditCommentReducer.comment.id,
    parentId: state.EditCommentReducer.comment.parentId,
    body: state.EditCommentReducer.comment.body,
    author: state.EditCommentReducer.comment.author,

  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    newComment: (id, timestamp, body, author, parentId) => {
      dispatch(newComment(id, timestamp, body, author, parentId));
      dispatch(closeCommentForm());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmitNewCommentButton);

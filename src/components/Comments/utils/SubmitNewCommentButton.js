/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { closeCommentForm } from '../../../actions/EditCommentAction';
import { newComment } from '../../../actions/CommentsAction';

class SubmitNewCommentButton extends React.Component {

  render() {
    const { newComment } = this.props;
    const { id, body, author, parentId } = this.props.EditCommentReducer.comment;
    console.log(id);
    console.log(body);
    return(
      <Button disabled={this.props.newCommentValidationCheck} onClick={()=> newComment(id, Date.now(), body, author, parentId)}>Submit</Button>
    );
  }
}

function mapStateToProps({ EditCommentReducer }) {
  return { EditCommentReducer };
}

const mapDispatchToProps = (dispatch) => {
  return {
    newComment: (id, timestamp, body, author, parentId) => {
      dispatch(newComment(id, timestamp, body, author, parentId));
      dispatch(closeCommentForm());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmitNewCommentButton);

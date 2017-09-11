/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { closeCommentForm } from '../../../actions/EditCommentAction';
import { editComment } from '../../../actions/CommentsAction';

class SubmitEditCommentButton extends React.Component {

  render() {
    const { editComment, id, body } = this.props;
    return(
      <Button onClick={()=> editComment(id, Date.now(), body)}>Submit Changes</Button>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    id: state.EditCommentReducer.comment.id,
    body: state.EditCommentReducer.comment.body,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    editComment: (id, timestamp, body) => {
      dispatch(editComment(id, timestamp, body));
      dispatch(closeCommentForm());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmitEditCommentButton);

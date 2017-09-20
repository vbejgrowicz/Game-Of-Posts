/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { closeCommentForm } from '../../../actions/EditCommentAction';
import { editComment } from '../../../actions/CommentsAction';

class SubmitEditCommentButton extends React.Component {

  render() {
    const { editComment } = this.props;
    const { id, body } = this.props.EditCommentReducer.comment;

    return(
      <Button disabled={this.props.editCommentValidationCheck} onClick={()=> editComment(id, Date.now(), body)}>Submit Changes</Button>
    );
  }
}

function mapStateToProps({ EditCommentReducer }) {
  return { EditCommentReducer };
}

const mapDispatchToProps = (dispatch) => {
  return {
    editComment: (id, timestamp, body) => {
      dispatch(editComment(id, timestamp, body));
      dispatch(closeCommentForm());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmitEditCommentButton);

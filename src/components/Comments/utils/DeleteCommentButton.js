/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { removeComment} from '../../../actions/CommentsAction';

class DeleteCommentButton extends React.Component {

  render() {
    const { removeComment, parentId, id } = this.props;
    return (
      <Button onClick={() => removeComment(parentId, id)}>Delete Comment</Button>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    removeComment: (parentId, comment) => {
      dispatch(removeComment(parentId, comment));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteCommentButton);

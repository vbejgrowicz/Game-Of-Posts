/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import { removeComment} from '../../../actions/CommentsAction';

class DeleteCommentButton extends React.Component {

  render() {
    return (
      <div className="Delete-Comment">
        <button onClick={() => this.props.removeComment(this.props.parentId, this.props.id)}>Delete Comment</button>
      </div>
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

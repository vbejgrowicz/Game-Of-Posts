/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import { Button, Glyphicon } from 'react-bootstrap';
import { removeComment} from '../../../actions/CommentsAction';

class DeleteCommentButton extends React.Component {

  render() {
    const { removeComment, parentId, id } = this.props;
    return (
      <div className="Remove-Button">
        <Button className="Custom-Button" onClick={() => removeComment(parentId, id)}><Glyphicon glyph="remove"/> Delete</Button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeComment: (parentId, comment) => {
      dispatch(removeComment(parentId, comment));
    },
  };
};

export default connect(null, mapDispatchToProps)(DeleteCommentButton);

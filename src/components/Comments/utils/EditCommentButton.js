/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import { Button, Glyphicon } from 'react-bootstrap';
import { openCommentForm, updateParentID, updateCommentID, isExistingComment, updateCommentBody, updateCommentAuthor } from '../../../actions/EditCommentAction';

class EditCommentButton extends React.Component {

  render() {
    const { openCommentForm, parentId, id, body, author } = this.props;
    return (
      <div className="Edit-Button">
        <Button className="Custom-Button" onClick={() => openCommentForm(parentId, id, body, author)}><Glyphicon glyph="pencil"/> Edit</Button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openCommentForm: (parentId, id, body, author) => {
      dispatch(updateParentID(parentId));
      dispatch(updateCommentID(id));
      dispatch(updateCommentBody(body));
      dispatch(updateCommentAuthor(author));
      dispatch(isExistingComment(true));
      dispatch(openCommentForm());
    }
  };
};

export default connect(null, mapDispatchToProps)(EditCommentButton);

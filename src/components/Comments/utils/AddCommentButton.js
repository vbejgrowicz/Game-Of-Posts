/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import { Button, Glyphicon } from 'react-bootstrap';
import { openCommentForm, updateParentID, updateCommentID, isExistingComment } from '../../../actions/EditCommentAction';
import { makeID, uniqueID } from '../../../utils/MakeID';

class AddCommentButton extends React.Component {

  render() {
    const { openCommentForm, parentId } = this.props;
    const { IDsUsed } = this.props.commentsReducer;
    return (
      <div className="Add-Button">
        <Button className="Custom-Button" onClick={() => openCommentForm(IDsUsed, parentId)}><Glyphicon glyph="plus"/> Add</Button>
      </div>
    );
  }
}

function mapStateToProps({ commentsReducer }) {
  return { commentsReducer };
}

const mapDispatchToProps = (dispatch) => {
  return {
    openCommentForm: (IDsUsed, parentId) => {
      var newID = makeID();
      var id = uniqueID(newID, IDsUsed);
      dispatch(updateCommentID(id));
      dispatch(updateParentID(parentId));
      dispatch(openCommentForm());
      dispatch(isExistingComment(false));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCommentButton);

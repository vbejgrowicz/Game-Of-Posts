/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import { Button, Glyphicon } from 'react-bootstrap';
import { openCommentForm, updateParentID, updateCommentID, isExistingComment } from '../../../actions/EditCommentAction';
import { makeID, uniqueID } from '../../../utils/MakeID';

class AddCommentButton extends React.Component {

  render() {
    const { openCommentForm, IDsUsed, parentId } = this.props;
    return (
      <div className="Add-Button">
        <Button className="Custom-Button" onClick={() => openCommentForm(IDsUsed, parentId)}><Glyphicon glyph="plus"/> Add</Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    IDsUsed: state.commentsReducer.IDsUsed,
  };
};
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

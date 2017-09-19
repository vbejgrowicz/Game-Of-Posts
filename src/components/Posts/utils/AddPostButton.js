/*jshint esversion: 6*/
import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import { connect } from 'react-redux';
import { openPostForm, updateID, updateCategory, isExistingPost } from '../../../actions/EditPostAction';
import { makeID, uniqueID } from '../../../utils/MakeID';


class AddPostButton extends React.Component {

  render() {
    const {IDsUsed, category, openPostForm } = this.props;
    return (
      <div className="Add-Button">
        <Button className="Custom-Button" onClick={() => openPostForm(IDsUsed, category)}><Glyphicon glyph="plus"/> Add</Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    IDsUsed: state.postsReducer.IDsUsed,
    category: state.activeViewReducer.category
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    openPostForm: (IDsUsed, category) => {
      var newID = makeID();
      var id = uniqueID(newID, IDsUsed);
      dispatch(updateCategory(category));
      dispatch(updateID(id));
      dispatch(openPostForm());
      dispatch(isExistingPost(false));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPostButton);

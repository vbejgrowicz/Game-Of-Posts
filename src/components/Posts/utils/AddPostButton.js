/*jshint esversion: 6*/
import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import { connect } from 'react-redux';
import { openPostForm, updateID, updateCategory, isExistingPost } from '../../../actions/EditPostAction';
import { makeID, uniqueID } from '../../../utils/MakeID';


class AddPostButton extends React.Component {

  render() {
    const { openPostForm, postsReducer, activeViewReducer } = this.props;
    const { IDsUsed } = postsReducer;
    const { category } = activeViewReducer;
    return (
      <div className="Add-Button">
        <Button className="Custom-Button" onClick={() => openPostForm(IDsUsed, category)}><Glyphicon glyph="plus"/> Add</Button>
      </div>
    );
  }
}

function mapStateToProps({ postsReducer, activeViewReducer }) {
  return { postsReducer, activeViewReducer };
}

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

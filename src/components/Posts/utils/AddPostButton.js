/*jshint esversion: 6*/
import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { openPostForm, updateID, isExistingPost } from '../../../actions/EditPostAction';
import { makeID, uniqueID } from '../../../utils/MakeID';


class AddPostButton extends React.Component {

  render() {
    const {IDsUsed, openPostForm } = this.props;
    return (
      <Button onClick={() => openPostForm(IDsUsed)}>Add Post</Button>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    IDsUsed: state.postsReducer.IDsUsed,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    openPostForm: (IDsUsed) => {
      var newID = makeID();
      var id = uniqueID(newID, IDsUsed);
      dispatch(updateID(id));
      dispatch(openPostForm());
      dispatch(isExistingPost(false));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPostButton);

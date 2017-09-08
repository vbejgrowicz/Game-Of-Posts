/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import { openPostForm, updateID, isExistingPost } from '../../actions/EditPostAction';
import { makeID, uniqueID } from '../../utils/MakeID';


class AddPostButton extends React.Component {

  render() {
    var IDsUsed = this.props.IDsUsed;
    return (
      <div className="Add-Post">
        <button onClick={() => this.props.openPostForm(IDsUsed)}>Add Post</button>
      </div>
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

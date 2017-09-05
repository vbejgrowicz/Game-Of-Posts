/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import { fetchAllIDs } from '../../actions/PostsAction';
import { openPostForm, updateID, isExistingPost } from '../../actions/EditPostAction';
import { makeID, uniqueID } from '../../utils/MakeID';


class AddPostButton extends React.Component {

  componentDidMount() {
    this.props.fetchAllIDs();
  }

  render() {
    var newID = makeID();
    var IDsUsed = this.props.IDsUsed;
    return (
      <div className="Add-Post">
        <button onClick={() => this.props.openPostForm(newID, IDsUsed)}>Add Post</button>
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
    openPostForm: (newID, IDsUsed) => {
      var id = uniqueID(newID, IDsUsed);
      dispatch(updateID(id));
      dispatch(openPostForm());
      dispatch(isExistingPost(false));
    },
    fetchAllIDs: () => {
      dispatch(fetchAllIDs());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPostButton);

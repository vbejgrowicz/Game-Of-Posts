/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import { openPostForm, fetchAllIDs } from '../../actions/PostsAction';
import PostForm from './PostForm';

class AddPost extends React.Component {

  render() {
    return (
      <div className="Add-Post">
      <button onClick={() => this.props.openPostForm()}>Add Post</button>
      <PostForm />
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
    openPostForm: () => {
      dispatch(openPostForm());
      dispatch(fetchAllIDs());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);

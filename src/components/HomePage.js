/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import DisplayPosts from './Posts/DisplayPosts';
import DisplaySorter from './Sort/DisplaySorter';
import { updatePostSort } from '../actions/PostsAction';
import AddPostButton from './Posts/utils/AddPostButton';
import PostForm from './Posts/PostForm';

class HomePage extends React.Component {

  render() {
    const { sortedby } = this.props.postsReducer;
    const { updatePostSort } = this.props;
    return (
      <div className="HomeContent">
        {this.props.children}
        <DisplaySorter sortedby={sortedby} sortfunction={updatePostSort.bind(this)}/>
        <DisplayPosts />
        <AddPostButton />
        <PostForm />
      </div>
    );
  }
}

function mapStateToProps({ postsReducer }) {
  return { postsReducer };
}

const mapDispatchToProps = (dispatch) => {
  return {
    updatePostSort: (sortMethod) => {
      dispatch(updatePostSort(sortMethod));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

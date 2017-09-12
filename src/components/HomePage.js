/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import DisplayPosts from './Posts/DisplayPosts';
import DisplaySorter from './Sort/DisplaySorter';
import { updateSort, sortPosts } from '../actions/PostsAction';
import AddPostButton from './Posts/utils/AddPostButton';
import PostForm from './Posts/PostForm';

class HomePage extends React.Component {

  render() {
    return(
      <div>
        {this.props.children}
        <DisplaySorter sortfunction={this.props.updateSort.bind(this)}/>
        <DisplayPosts />
        <AddPostButton />
        <PostForm />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    posts: state.postsReducer.posts,
    comments: state.commentsReducer.comments,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateSort: (sortMethod) => {
      dispatch(updateSort(sortMethod));
      dispatch(sortPosts());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

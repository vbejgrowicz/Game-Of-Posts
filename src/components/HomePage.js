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
    return (
      <div>
        {this.props.children}
        <DisplaySorter sortfunction={this.props.updatePostSort.bind(this)}/>
        <DisplayPosts />
        <AddPostButton />
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
    updatePostSort: (sortMethod) => {
      dispatch(updatePostSort(sortMethod));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import DisplayPosts from './Posts/DisplayPosts';
import DisplaySorter from './Sort/DisplaySorter';
import { updateSort, sortPosts } from '../actions/PostsAction';
import AddPostButton from './Posts/utils/AddPostButton';
import PostForm from './Posts/PostForm';
import Loading from '../utils/Loading';

class HomePage extends React.Component {

  render() {
    return this.props.isLoading ?(
      <Loading />
    ):(
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
    isLoading: state.activeViewReducer.isLoading,
    detailedPostView: state.activeViewReducer.detailedPostView
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

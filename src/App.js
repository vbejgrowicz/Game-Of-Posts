/*jshint esversion: 6*/
import React from 'react';
import HomePage from './HomePage';
import PostDetailView from './Posts/PostDetailView';
import PostForm from './Posts/PostForm';
import { connect } from 'react-redux';
import { fetchPosts } from './actions/PostsAction';
import { fetchCategories } from './actions/CategoriesAction';

import './App.css';

class App extends React.Component {

  componentDidMount() {
    this.props.getPosts();
    this.props.getCategories();
  }

  render() {
    return this.props.detailedPostView ?(
      <div className="App">
        <div className="Post-Detail-Page">
          <PostDetailView />
          <PostForm />
        </div>
      </div>
    ):(
      <div className="App">
        <div className="HomePage">
          <HomePage />
          <PostForm />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.postsReducer.posts,
    detailedPostView: state.activeViewReducer.detailedPostView,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: () => dispatch(fetchCategories()),
    getPosts: () => dispatch(fetchPosts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

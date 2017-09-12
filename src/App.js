/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import PostDetailView from './components/Posts/PostDetailView';
import PostForm from './components/Posts/PostForm';
import CommentForm from './components/Comments/CommentForm';
import { fetchCategories } from './actions/CategoriesAction';

import './style/App.css';

class App extends React.Component {

  componentDidMount() {
    this.props.getCategories();
  }

  render() {
    return this.props.detailedPostView ?(
      <div className="App">
        <div className="Post-Detail-Page">
          <PostDetailView />
          <PostForm />
          <CommentForm />
        </div>
      </div>
    ):(
      <div className="App">
        <div className="HomePage">
          {this.props.children}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

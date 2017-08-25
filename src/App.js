/*jshint esversion: 6*/
import React, { Component } from 'react';
import HomePage from './HomePage';
import { connect } from 'react-redux';
import { fetchPosts } from './actions/PostsAction';
import { fetchCategories } from './actions/CategoriesAction';

import './App.css';

class App extends Component {

  componentDidMount() {
    this.props.getPosts();
    this.props.getCategories();
  }

  render() {
    return (
      <div className="App">
        <HomePage />
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
    getCategories: () => dispatch(fetchCategories()),
    getPosts: () => dispatch(fetchPosts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

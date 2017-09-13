/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import { detailedPostViewActive, activeView } from './actions/ActiveViewAction';
import { fetchCategories } from './actions/CategoriesAction';
import { fetchAll, fetchPostDetails, fetchCurrentPosts } from './actions/PostsAction';

import './style/App.css';

class App extends React.Component {

  componentDidMount() {
    this.props.fetchAll();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.postID && this.props.AllPosts !== nextProps.AllPosts){
        this.props.fetchPostDetails(nextProps.params.postID);
    }
  }

  render() {
    return(
      <div className="App">
          {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    AllPosts: state.postsReducer.AllPosts
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAll: () => {
      dispatch(fetchCategories());
      dispatch(fetchAll());
    },
    fetchPostDetails: (id) => {
      dispatch(detailedPostViewActive());
      dispatch(fetchPostDetails(id));
    },
    updateCurrentCategory: (category) => {
      dispatch(activeView(category));
      dispatch(fetchCurrentPosts(category));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import { isLoading, detailedPostViewActive } from './actions/ActiveViewAction';
import { fetchCategories } from './actions/CategoriesAction';
import { fetchAll, fetchPostDetails } from './actions/PostsAction';
import { setParentID } from './actions/CommentsAction';

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
    comments: state.commentsReducer.comments,
    AllPosts: state.postsReducer.AllPosts
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAll: () => {
      dispatch(isLoading());
      dispatch(fetchCategories());
      dispatch(fetchAll());
    },
    fetchPostDetails: (id) => {
      dispatch(setParentID(id));
      dispatch(detailedPostViewActive());
      dispatch(fetchPostDetails(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

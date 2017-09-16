/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import { isLoading, isNotLoading, activeView, detailedPostViewActive } from './actions/ActiveViewAction';
import { fetchCategories } from './actions/CategoriesAction';
import { fetchAll, fetchCurrentPosts, fetchPostDetails } from './actions/PostsAction';
import { setParentID } from './actions/CommentsAction';
import Loading from './utils/Loading';
import './style/App.css';

class App extends React.Component {

  componentDidMount() {
    this.props.isLoading();
    this.props.fetchCategories();
    this.props.fetchAll();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.postID && this.props.AllPosts !== nextProps.AllPosts){
      this.props.fetchPostDetails(nextProps.params.postID);
    }
    else if (this.props.AllPosts !== nextProps.AllPosts || this.props.params.category !== nextProps.params.category){
      this.props.fetchCategoryPosts(nextProps.params.category || "home");
    }
    else if (this.props.categories.length > 0 && (Object.keys(nextProps.comments).length === nextProps.AllPosts.length)) {
      this.props.isNotLoading();
    }
  }

  render() {
    return this.props.LoadingStatus ?(
      <Loading />
    ):(
      <div className="App">
          {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    LoadingStatus: state.activeViewReducer.LoadingStatus,
    categories: state.categoriesReducer.categories,
    category: state.activeViewReducer.category,
    comments: state.commentsReducer.comments,
    AllPosts: state.postsReducer.AllPosts
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAll: () => {
      dispatch(fetchAll());
    },
    fetchCategories: () => {
      dispatch(fetchCategories());
    },
    fetchCategoryPosts: (category) => {
      dispatch(activeView(category));
      dispatch(fetchCurrentPosts(category));
    },
    isLoading: () => dispatch(isLoading()),
    isNotLoading: () => dispatch(isNotLoading()),
    fetchPostDetails: (id) => {
      dispatch(setParentID(id));
      dispatch(detailedPostViewActive());
      dispatch(fetchPostDetails(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

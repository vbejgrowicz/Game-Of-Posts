/*jshint esversion: 6*/
import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { isLoading, isNotLoading } from './actions/ActiveViewAction';
import { fetchCategories } from './actions/CategoriesAction';
import { fetchAll } from './actions/PostsAction';
import Loading from './utils/Loading';
import './style/App.css';
import HomePage from './components/HomePage';
import DetailPage from './components/DetailPage';

class App extends React.Component {

  componentDidMount() {
    const { isLoading, fetchCategories, fetchAll } = this.props;
    isLoading();
    fetchCategories();
    fetchAll();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.categories.length > 0 && (Object.keys(nextProps.comments).length === nextProps.AllPosts.length)) {
      this.props.isNotLoading();
    }
  }

  render() {
    return this.props.LoadingStatus ?(
      <Loading />
    ):(
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/:category" component={HomePage} />
          <Route exact path="/:category/:postID" component={DetailPage} />
        </Switch>
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
    isLoading: () => dispatch(isLoading()),
    isNotLoading: () => dispatch(isNotLoading()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

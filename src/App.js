/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import { fetchCategories } from './actions/CategoriesAction';
import { fetchAllIDs } from './actions/PostsAction';

import './style/App.css';

class App extends React.Component {

  componentDidMount() {
    this.props.getCategories();
    this.props.fetchAllIDs();
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: () => dispatch(fetchCategories()),
    fetchAllIDs: () => dispatch(fetchAllIDs()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

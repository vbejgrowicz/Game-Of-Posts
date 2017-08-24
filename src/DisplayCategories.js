/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import { fetchCategories } from './actions/CategoriesAction';
import { activeView } from './actions/ActiveViewAction';
import { fetchCategoryPosts } from './actions/PostsAction';


class DisplayCategories extends React.Component {

  render() {
    return this.props.categories ? (
      <div>
      {this.props.categories.map((category, idx) => {
        return(
          <li className="Category-List" key={idx}>
            <div className="category" onClick={() => this.props.updateCurrentCategoryPosts(category)}>
              {category}
            </div>
          </li>
        );
      })}
    </div>
    ): null;
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categoriesReducer.categories
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: dispatch(fetchCategories()),
    updateCurrentCategoryPosts: (category) => { dispatch(activeView(category)); dispatch(fetchCategoryPosts(category)); }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayCategories);

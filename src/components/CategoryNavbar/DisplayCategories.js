/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import { activeView } from '../../actions/ActiveViewAction';
import { fetchPosts, fetchCategoryPosts } from '../../actions/PostsAction';
import { Nav, NavItem } from 'react-bootstrap';
import { Capitalize } from '../../utils/Capitalize';

class DisplayCategories extends React.Component {

  render() {
    const { category, categories, reloadHomePage, updateCurrentCategoryPosts } = this.props;
    return(
      <Nav bsStyle="tabs" justified activeKey={category || "home"}>
        <NavItem className="category-name" eventKey={"home"} onClick={() => reloadHomePage("home")}>Home</NavItem>
        {categories.map((categoryid, idx) => {
        return(
          <NavItem className="category-name" key={idx} eventKey={categoryid} onClick={() => updateCurrentCategoryPosts(categoryid)}>{Capitalize(category)}</NavItem>
        );
      })}
    </Nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categoriesReducer.categories,
    category: state.activeViewReducer.category,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    reloadHomePage: (category) => {
      dispatch(activeView(category));
      dispatch(fetchPosts());
    },
    updateCurrentCategoryPosts: (category) => {
      dispatch(activeView(category));
      dispatch(fetchCategoryPosts(category));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayCategories);

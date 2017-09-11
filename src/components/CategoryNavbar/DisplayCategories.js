/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import { activeView } from '../../actions/ActiveViewAction';
import { fetchPosts, fetchCategoryPosts } from '../../actions/PostsAction';
import { Nav, NavItem } from 'react-bootstrap';
import { Capitalize } from '../../utils/Capitalize';

class DisplayCategories extends React.Component {

  render() {
    return(
      <Nav bsStyle="tabs" justified activeKey={this.props.category || "home"}>
        <NavItem className="category-name" eventKey={"home"} onClick={() => this.props.reloadHomePage("home")}>Home</NavItem>
        {this.props.categories.map((category, idx) => {
        return(
          <NavItem className="category-name" key={idx} eventKey={category} onClick={() => this.props.updateCurrentCategoryPosts(category)}>{Capitalize(category)}</NavItem>
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

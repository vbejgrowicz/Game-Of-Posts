/*jshint esversion: 6*/
import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { activeView } from '../../actions/ActiveViewAction';
import { fetchCurrentPosts } from '../../actions/PostsAction';
import { Nav, NavItem } from 'react-bootstrap';
import { Capitalize } from '../../utils/Capitalize';

class DisplayCategories extends React.Component {

  componentDidMount() {
    this.props.updateCurrentCategory(this.props.params.category || "home");
  }


  componentWillReceiveProps(nextProps) {
    if (this.props.params.category !== nextProps.params.category) {
      this.props.updateCurrentCategory(nextProps.params.category || "home");
    }
  }

  render() {
    console.log(this.props.params.postID);
    const { categories } = this.props;
    return(
      <Nav bsStyle="tabs" justified>
        <LinkContainer to='/'><NavItem>Home</NavItem></LinkContainer>
        {categories.map((category, idx) => {
        return(
          <LinkContainer to={'/' + category} key={idx}><NavItem>{Capitalize(category)}</NavItem></LinkContainer>
        );
      })}
      </Nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categoriesReducer.categories,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateCurrentCategory: (category) => {
      dispatch(activeView(category));
      dispatch(fetchCurrentPosts(category));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayCategories);

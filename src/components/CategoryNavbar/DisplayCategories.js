/*jshint esversion: 6*/
import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { Nav, NavItem } from 'react-bootstrap';
import { Capitalize } from '../../utils/Capitalize';

class DisplayCategories extends React.Component {

  render() {
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayCategories);

/*jshint esversion: 6*/
import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { Nav, NavItem } from 'react-bootstrap';
import { Capitalize } from '../../utils/Capitalize';

class DisplayCategories extends React.Component {

  render() {
    const { categories } = this.props.categoriesReducer;
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

function mapStateToProps({ categoriesReducer }) {
  return { categoriesReducer };
}

export default connect(mapStateToProps, null)(DisplayCategories);

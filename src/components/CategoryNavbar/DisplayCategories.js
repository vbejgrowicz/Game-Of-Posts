/*jshint esversion: 6*/
import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Nav, NavItem } from 'react-bootstrap';

class DisplayCategories extends React.Component {

  render() {
    const { categories } = this.props.categoriesReducer;
    return(
      <Nav bsStyle="tabs" justified>
        <LinkContainer exact={true} to='/'><NavItem>Home</NavItem></LinkContainer>
        {categories.map((category, idx) => {
        return(
          <LinkContainer exact={true} to={'/' + category.split(" ").join("_")} key={idx}><NavItem>{category}</NavItem></LinkContainer>
        );
      })}
      </Nav>
    );
  }
}

function mapStateToProps({ categoriesReducer }) {
  return { categoriesReducer };
}

export default withRouter(connect(mapStateToProps, null)(DisplayCategories));

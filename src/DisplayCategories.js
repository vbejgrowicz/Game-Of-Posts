/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import { fetchCategories } from './actions';

class DisplayCategories extends React.Component {

  render() {
    return this.props.categories ? (
      <div>
      {this.props.categories.map((category, idx) => {
        return(
          <li key={idx}>
            <div className="category">
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
    categories: state.categories
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: dispatch(fetchCategories()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayCategories);

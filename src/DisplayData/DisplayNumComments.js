/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import '../App.css';

class DisplayNumComments extends React.Component {

  render() {
    var parentId = this.props.parentId;
    return this.props.commentsReducer[parentId] ?(
    <div className="comments-number">
      {this.props.commentsReducer[parentId].length} Comments
    </div>
  ):(
    <div>&nbsp;</div>
  );
  }
}

const mapStateToProps = (state) => {
  return {
    commentsReducer: state.commentsReducer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayNumComments);

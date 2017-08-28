/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import '../App.css';

class DisplayComments extends React.Component {

  render() {
    var parentId = this.props.parentId;
    console.log(this.props.commentsReducer[parentId]);
    return this.props.commentsReducer[parentId] ?(
    <div>
      {this.props.commentsReducer[parentId].length} Comments
    </div>
  ):(
    <div>
    </div>);
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

export default connect(mapStateToProps, mapDispatchToProps)(DisplayComments);

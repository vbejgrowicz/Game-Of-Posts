/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';

class DisplayNumComments extends React.Component {

  render() {
    var parentId = this.props.parentId;
    return this.props.comments[parentId] ?(
    <div className="comments-number">
      {this.props.comments[parentId].length} Comments
    </div>
  ):(
    <div>&nbsp;</div>
  );
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.commentsReducer.comments,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayNumComments);

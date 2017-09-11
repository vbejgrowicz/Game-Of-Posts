/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';

class DisplayNumComments extends React.Component {

  render() {
    const { comments, parentId } = this.props;
    return comments[parentId] ?(
      <div className="comments-number">
        {comments[parentId].length} Comments
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

/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';

class DisplayNumComments extends React.Component {

  render() {
    const { comments } = this.props.commentsReducer;
    const { parentId } = this.props;
    return comments[parentId] ?(
      <div className="comments-number">
        {comments[parentId].length} Comments
      </div>
    ):(
      <div>&nbsp;</div>
    );
  }
}

function mapStateToProps({ commentsReducer }) {
  return { commentsReducer };
}

export default connect(mapStateToProps, null)(DisplayNumComments);

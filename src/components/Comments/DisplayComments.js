/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import CommentDetails from './CommentDetails';

class DisplayComments extends React.Component {

  render() {
    const { comments, parentId } = this.props;
    return comments[parentId] ?(
      <div className="Comment-List">
        {comments[parentId].map((comment) => {
          return(
            <li className="Comment-in-List" key={comment.id}>
              <CommentDetails comment={comment}/>
            </li>
          );
        })}
      </div>
    ):
    null;
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

export default connect(mapStateToProps, mapDispatchToProps)(DisplayComments);

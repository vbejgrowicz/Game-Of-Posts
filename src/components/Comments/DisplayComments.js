/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import CommentDetails from './CommentDetails';

class DisplayComments extends React.Component {

  render() {
    const { comments, parentId } = this.props;
    return(
      <div className="Comment-List">
        {comments[parentId].map((comment) => {
          return(
            <li className="Comment" key={comment.id}>
              <CommentDetails comment={comment}/>
            </li>
          );
        })}
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DisplayComments);

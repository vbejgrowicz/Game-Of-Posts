/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import CommentDetails from './CommentDetails';

class DisplayComments extends React.Component {

  render() {
    const { parentId } = this.props;
    const { comments } = this.props.commentsReducer;
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

function mapStateToProps({ commentsReducer }) {
  return { commentsReducer };
}

export default connect(mapStateToProps, null)(DisplayComments);

/*jshint esversion: 6*/
import React from 'react';
import DisplayBody from '../DisplayData/DisplayBody';
import DisplayAuthor from '../DisplayData/DisplayAuthor';
import DisplayTimestamp from '../DisplayData/DisplayTimestamp';
import DisplayVoteScore from '../DisplayData/DisplayVoteScore';
import DeleteCommentButton from './utils/DeleteCommentButton';
import EditCommentButton from './utils/EditCommentButton';

class CommentDetails extends React.Component {

  render() {
    const { comment } = this.props;
    return(
      <div>
        <DisplayVoteScore voteScore={comment.voteScore} comment={comment.id}/>
        <div className="Comment-Data">
          <DisplayBody body={comment.body} />
          <div className="comment-date-and-author">
            <DisplayTimestamp timestamp={comment.timestamp} />
            &nbsp;by&nbsp;
            <DisplayAuthor author={comment.author} />
          </div>
        </div>
        <EditCommentButton parentId={comment.parentId} id={comment.id} body={comment.body} author={comment.author}/>
        <DeleteCommentButton parentId={comment.parentId} id={comment.id} />
      </div>
    );
  }
}

export default CommentDetails;

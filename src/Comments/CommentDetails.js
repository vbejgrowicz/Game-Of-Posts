/*jshint esversion: 6*/
import React from 'react';
import DisplayBody from '../DisplayData/DisplayBody';
import DisplayAuthor from '../DisplayData/DisplayAuthor';
import DisplayTimestamp from '../DisplayData/DisplayTimestamp';
import DisplayVoteScore from '../DisplayData/DisplayVoteScore';

class CommentDetails extends React.Component {
  // <EditPostButton id={this.props.post.id} title={this.props.post.title} body={this.props.post.body} author={this.props.post.author} category={this.props.post.category} />

  render() {
    return(
      <div>
      <DisplayVoteScore voteScore={this.props.comment.voteScore} comment={this.props.comment.id}/>
      <div className="Comment-Data">
        <DisplayBody body={this.props.comment.body} />
        <div className="comment-date-and-author">
          <DisplayTimestamp timestamp={this.props.comment.timestamp} />
          &nbsp;by&nbsp;
          <DisplayAuthor author={this.props.comment.author} />
        </div>
      </div>
      </div>
    );
  }
}

export default CommentDetails;

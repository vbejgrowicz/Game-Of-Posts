/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import DisplayBody from '../DisplayData/DisplayBody';
import DisplayAuthor from '../DisplayData/DisplayAuthor';
import DisplayTimestamp from '../DisplayData/DisplayTimestamp';
import DisplayVoteScore from '../DisplayData/DisplayVoteScore';
import DeleteCommentButton from './utils/DeleteCommentButton';
import EditCommentButton from './utils/EditCommentButton';
import { changeCommentVoteScore } from '../../actions/CommentsAction';

class CommentDetails extends React.Component {

  voteEventComment(comment, vote) {
    this.props.changeCommentVoteScore(comment, vote);
  }

  render() {
    const { comment } = this.props;
    return(
      <div className="Comment">
        <DisplayVoteScore voteScore={comment.voteScore} comment={comment.id} voteEvent={this.voteEventComment.bind(this)}/>
        <div className="Comment-Data">
          <DisplayBody body={comment.body} />
          <div className="date-and-author">
            <DisplayTimestamp timestamp={comment.timestamp} />
            &nbsp;by&nbsp;
            <DisplayAuthor author={comment.author} />
          </div>
        </div>
        <div className="Comment-Buttons">
          <EditCommentButton parentId={comment.parentId} id={comment.id} body={comment.body} author={comment.author}/>
          <DeleteCommentButton parentId={comment.parentId} id={comment.id} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    detailedPostView: state.activeViewReducer.detailedPostView,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    changeCommentVoteScore: (id, vote) => dispatch(changeCommentVoteScore(id, vote)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentDetails);

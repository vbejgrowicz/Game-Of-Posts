/*jshint esversion:6*/
import React from 'react';
import { connect } from 'react-redux';
import { changeVoteScore } from '../actions/PostsAction';
import { changeCommentVoteScore } from '../actions/CommentsAction';
import { fetchPost } from '../actions/ActiveViewAction';

class DisplayVoteScore extends React.Component {

  voteEventPost(vote) {
    this.props.changeVoteScore(this.props.post, vote);
      if (this.props.detailedPostView === true) {
        this.props.fetchPost(this.props.post);
      }
  }
  voteEventComment(vote) {
    console.log(this.props.comment);
    this.props.changeCommentVoteScore(this.props.comment, vote);
  }


  render() {
    return this.props.comment ? (
      <div className="vote-score">
      <button onClick={() => this.voteEventComment("upVote")}>Vote Up</button>
      {this.props.voteScore}
      <button onClick={() => this.voteEventComment("downVote")}>Vote Down</button>
      </div>
    ):(
      <div className="vote-score">
      <button onClick={() => this.voteEventPost("upVote")}>Vote Up</button>
      {this.props.voteScore}
      <button onClick={() => this.voteEventPost("downVote")}>Vote Down</button>
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
    changeVoteScore: (id, vote) => dispatch(changeVoteScore(id, vote)),
    changeCommentVoteScore: (id, vote) => dispatch(changeCommentVoteScore(id, vote)),
    fetchPost: (id) => dispatch(fetchPost(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayVoteScore);

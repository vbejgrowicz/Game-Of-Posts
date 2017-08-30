/*jshint esversion:6*/
import React from 'react';
import { connect } from 'react-redux';

import { changeVoteScore } from '../actions/PostsAction';


class DisplayVoteScore extends React.Component {

  render() {
    return (
      <div className="vote-score">
      <button onClick={() => this.props.changeVoteScore(this.props.post, "upVote")}>upVote</button>
      {this.props.voteScore}
      <button onClick={() => this.props.changeVoteScore(this.props.post, "downVote")}>downVote</button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    posts: state.postsReducer.posts,
    sortedby: state.postsReducer.sortedby,
  };
};
const mapDispatchToProps = (dispatch, state) => {
  return {
    changeVoteScore: (id, vote) => dispatch(changeVoteScore(id,vote)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayVoteScore);

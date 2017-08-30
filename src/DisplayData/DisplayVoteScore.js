/*jshint esversion:6*/
import React from 'react';
import { connect } from 'react-redux';

import { changeVoteScore } from '../actions/PostsAction';


class DisplayVoteScore extends React.Component {

  voteEvent(vote) {
    this.props.changeVoteScore(this.props.post, vote);
  }
  render() {
    return (
      <div className="vote-score">
      <button onClick={() => this.voteEvent("upVote")}>Vote Up</button>
      {this.props.voteScore}
      <button onClick={() => this.voteEvent("downVote")}>Vote Down</button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    changeVoteScore: (id, vote) => dispatch(changeVoteScore(id,vote))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayVoteScore);

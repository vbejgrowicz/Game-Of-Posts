/*jshint esversion:6*/
import React from 'react';
import { connect } from 'react-redux';
import { changeVoteScore } from '../actions/PostsAction';
import { fetchPost } from '../actions/ActiveViewAction';

class DisplayVoteScore extends React.Component {

  voteEvent(vote) {
    this.props.changeVoteScore(this.props.post, vote);
    if (this.props.detailedPostView === true) {
      this.props.fetchPost(this.props.post);
    }
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
    detailedPostView: state.activeViewReducer.detailedPostView,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    changeVoteScore: (id, vote) => dispatch(changeVoteScore(id,vote)),
    fetchPost: (id) => dispatch(fetchPost(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayVoteScore);

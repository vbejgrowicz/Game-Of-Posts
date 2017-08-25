/* jshint esversion:6 */
import React from 'react';
import { connect } from 'react-redux';
import { voteScoreSort, timestampSort } from './actions/PostsAction';

class DisplaySorter extends React.Component {

  render() {
    return (
      <div>
        <button onClick={() => this.props.sortByVoteScore(this.props.posts)}>sort by voteScore</button>
        <button onClick={() => this.props.sortbyTimestamp(this.props.posts)}>sort by timestamp</button>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.postsReducer.posts,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    sortByVoteScore: (posts) => dispatch(voteScoreSort(posts)),
    sortbyTimestamp: (posts) => dispatch(timestampSort(posts)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplaySorter);

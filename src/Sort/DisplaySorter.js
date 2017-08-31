/* jshint esversion:6 */
import React from 'react';
import { connect } from 'react-redux';
import { sortPosts } from '../actions/PostsAction';

class DisplaySorter extends React.Component {

  render() {
    return (
      <div>
        <button onClick={() => this.props.sortPosts(this.props.posts, "voteScore")}>sort by voteScore</button>
        <button onClick={() => this.props.sortPosts(this.props.posts, "timestamp")}>sort by timestamp</button>
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
    sortPosts: (posts, sortMethod) => dispatch(sortPosts(posts, sortMethod)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplaySorter);

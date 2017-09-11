/* jshint esversion:6 */
import React from 'react';
import { connect } from 'react-redux';
import { sortPosts } from '../../actions/PostsAction';
import { sortComments } from '../../actions/CommentsAction';

class DisplaySorter extends React.Component {

  render() {
    return this.props.parentId ?(
      <div>
        <button onClick={() => this.props.sortComments(this.props.parentId, this.props.comments[this.props.parentId], "voteScore")}>sort by voteScore</button>
        <button onClick={() => this.props.sortComments(this.props.parentId, this.props.comments[this.props.parentId], "timestamp")}>sort by timestamp</button>
      </div>
    ):(
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
    comments: state.commentsReducer.comments,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    sortPosts: (posts, sortMethod) => dispatch(sortPosts(posts, sortMethod)),
    sortComments: (parentId, comments, sortMethod) => dispatch(sortComments(parentId, comments, sortMethod)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplaySorter);

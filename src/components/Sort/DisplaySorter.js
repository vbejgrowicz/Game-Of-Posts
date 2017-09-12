/* jshint esversion:6 */
import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { sortComments } from '../../actions/CommentsAction';

class DisplaySorter extends React.Component {

  render() {
    return this.props.parentId ?(
      <div>
        <Button onClick={() => this.props.sortComments(this.props.parentId, this.props.comments[this.props.parentId], "voteScore")}>sort by voteScore</Button>
        <Button onClick={() => this.props.sortComments(this.props.parentId, this.props.comments[this.props.parentId], "timestamp")}>sort by timestamp</Button>
      </div>
    ):(
      <div>
        <Button onClick={() => this.props.sortfunction("voteScore")}>sort by voteScore</Button>
        <Button onClick={() => this.props.sortfunction("timestamp")}>sort by timestamp</Button>
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
    sortComments: (parentId, comments, sortMethod) => dispatch(sortComments(parentId, comments, sortMethod)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplaySorter);

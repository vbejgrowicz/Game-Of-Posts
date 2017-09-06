/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import EditPostButton from './utils/EditPostButton';
import DeletePostButton from './utils/DeletePostButton';
import DisplayTitle from '../DisplayData/DisplayTitle';
import DisplayAuthor from '../DisplayData/DisplayAuthor';
import DisplayBody from '../DisplayData/DisplayBody';
import DisplayTimestamp from '../DisplayData/DisplayTimestamp';
import DisplayNumComments from '../DisplayData/DisplayNumComments';
import DisplayVoteScore from '../DisplayData/DisplayVoteScore';
import { detailedPostViewActive, currentPost } from '../actions/ActiveViewAction';

class PostDetails extends React.Component {

  render() {
    return(
      <div>
      <DisplayVoteScore voteScore={this.props.post.voteScore} post={this.props.post.id}/>
      <div className="Post-Data" onClick={() => this.props.detailedPostViewActive(this.props.post)}>
        <DisplayTitle title={this.props.post.title} />
        <DisplayBody body={this.props.post.body} />
        <div className="post-date-and-author">
          <DisplayTimestamp timestamp={this.props.post.timestamp} />
          &nbsp;by&nbsp;
          <DisplayAuthor author={this.props.post.author} />
        </div>
        <DisplayNumComments parentId={this.props.post.id} />
      </div>
      <EditPostButton id={this.props.post.id} title={this.props.post.title} body={this.props.post.body} author={this.props.post.author} category={this.props.post.category} />
      <DeletePostButton id={this.props.post.id} />
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
    detailedPostViewActive: (post) => {
      dispatch(currentPost(post));
      dispatch(detailedPostViewActive());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);

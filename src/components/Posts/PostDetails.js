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
import { changeVoteScore } from '../../actions/PostsAction';
import { fetchPost } from '../../actions/ActiveViewAction';
import { detailedPostViewActive, currentPost } from '../../actions/ActiveViewAction';

class PostDetails extends React.Component {

  voteEventPost(post, vote) {
    this.props.changeVoteScore(post, vote);
      if (this.props.detailedPostView === true) {
        this.props.fetchPost(post);
      }
  }

  render() {
    const { post, detailedPostViewActive } = this.props;
    return(
      <div>
        <DisplayVoteScore voteScore={post.voteScore} post={post.id} voteEvent={this.voteEventPost.bind(this)}/>
        <div className="Post-Data" onClick={() => detailedPostViewActive(post)}>
          <DisplayTitle title={post.title} />
          <DisplayBody body={post.body} />
          <div className="post-date-and-author">
            <DisplayTimestamp timestamp={post.timestamp} />
            &nbsp;by&nbsp;
            <DisplayAuthor author={post.author} />
          </div>
          <DisplayNumComments parentId={post.id} />
        </div>
        <EditPostButton id={post.id} title={post.title} body={post.body} author={post.author} category={post.category} />
        <DeletePostButton id={post.id} />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    posts: state.postsReducer.posts,
    detailedPostView: state.activeViewReducer.detailedPostView,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    detailedPostViewActive: (post) => {
      dispatch(currentPost(post));
      dispatch(detailedPostViewActive());
    },
    changeVoteScore: (id, vote) => dispatch(changeVoteScore(id, vote)),
    fetchPost: (id) => dispatch(fetchPost(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);

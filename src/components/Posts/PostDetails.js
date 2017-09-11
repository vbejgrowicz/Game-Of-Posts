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
import { detailedPostViewActive, currentPost } from '../../actions/ActiveViewAction';

class PostDetails extends React.Component {

  render() {
    const { post } = this.props;
    return(
      <div>
        <DisplayVoteScore voteScore={post.voteScore} post={post.id}/>
        <div className="Post-Data" onClick={() => this.props.detailedPostViewActive(post)}>
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

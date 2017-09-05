/*jshint esversion:6*/
import React from 'react';
import { connect } from 'react-redux';
import PostDetails from './PostDetails';
import DisplayComments from '../Comments/DisplayComments';
import { fetchPost } from '../actions/ActiveViewAction';
import { detailedPostViewNotActive } from '../actions/ActiveViewAction';


class PostDetailView extends React.Component {

  render() {
    return (
      <div>
        <div>
          <button onClick={() => this.props.detailedPostViewNotActive()}>Back</button>
        </div>
        <div className="detailed-post">
          <PostDetails post={this.props.currentPost} />
        </div>
        <div className="comments">
          <DisplayComments parentId={this.props.posts.id}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentPost: state.activeViewReducer.post,
    posts: state.postsReducer.posts,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    detailedPostViewNotActive: () => {
      dispatch(detailedPostViewNotActive());
    },
    fetchPost: (id) => {
      dispatch(fetchPost(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailView);

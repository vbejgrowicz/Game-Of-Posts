/*jshint esversion:6*/
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import PostDetails from './PostDetails';
import DisplayComments from '../Comments/DisplayComments';
import DisplaySorter from '../Sort/DisplaySorter';
import AddCommentButton from '../Comments/utils/AddCommentButton';
import { isLoading, isNotLoading } from '../../actions/ActiveViewAction';
import { fetchPostDetails, removePost } from '../../actions/PostsAction';
import { updateCommentSort } from '../../actions/CommentsAction';

class PostDetailView extends React.Component {

home() {
  this.context.router.push('/');
}

deletePost(post, home){
  this.props.isLoading();
  this.props.removePost(post, home);
}

  render() {
    const post = this.props.CurrentPosts[0];
    return post ?(
      <div className="Post-Detail-Page">
        <div>
          <Button onClick={() => this.context.router.push('/')}>Back</Button>
        </div>
        <div className="detailed-post">
          <PostDetails post={post} deletePostfunction={this.deletePost.bind(this, post.id, this.home.bind(this))}/>
        </div>
        <div className="comments">
          <DisplaySorter parentId={post.id} sortfunction={this.props.updateCommentSort.bind(this, post.id)}/>
          <DisplayComments parentId={post.id} />
          <AddCommentButton parentId={post.id} />
        </div>
      </div>
    ):(
      <div>
        No Post at this ID available!
      </div>
  );
}
}

PostDetailView.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    CurrentPosts: state.postsReducer.CurrentPosts,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchPostDetails: (post) => {
      dispatch(fetchPostDetails(post));
      dispatch(isNotLoading());
    },
    updateCommentSort: (parentId, sortMethod) => {
      dispatch(updateCommentSort(parentId, sortMethod));
    },
    isLoading: () => dispatch(isLoading()),
    removePost: (id, home) => {
      dispatch(removePost(id, home));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailView);

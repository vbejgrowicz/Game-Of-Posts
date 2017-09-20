/*jshint esversion:6*/
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostDetails from './PostDetails';
import DisplayComments from '../Comments/DisplayComments';
import DisplaySorter from '../Sort/DisplaySorter';
import AddCommentButton from '../Comments/utils/AddCommentButton';
import { isLoading } from '../../actions/ActiveViewAction';
import { removePost } from '../../actions/PostsAction';
import { updateCommentSort } from '../../actions/CommentsAction';
import ErrorPage from '../ErrorPage';

class PostDetailView extends React.Component {

home() {
  this.context.router.push('/');
}

deletePost(post, home){
  this.props.isLoading();
  this.props.removePost(post, home);
}

  render() {
    const { CurrentPosts } = this.props.postsReducer;
    const { sortedby } = this.props.commentsReducer;
    const post = CurrentPosts[0];
    return post ?(
      <div className="Post-Detail-Page">
        <div className="Detailed-Post">
          <PostDetails post={post} deletePostfunction={this.deletePost.bind(this, post.id, this.home.bind(this))}/>
          <DisplaySorter parentId={post.id} sortedby={sortedby} sortfunction={this.props.updateCommentSort.bind(this)}/>
          <DisplayComments parentId={post.id} />
          <AddCommentButton parentId={post.id} />
        </div>
      </div>
    ):(
      <ErrorPage />
  );
}
}

PostDetailView.contextTypes = {
  router: PropTypes.object.isRequired
};


function mapStateToProps({ postsReducer, commentsReducer }) {
  return { postsReducer, commentsReducer };
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCommentSort: (sortMethod) => {
      dispatch(updateCommentSort(sortMethod));
    },
    isLoading: () => dispatch(isLoading()),
    removePost: (id, home) => {
      dispatch(removePost(id, home));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailView);

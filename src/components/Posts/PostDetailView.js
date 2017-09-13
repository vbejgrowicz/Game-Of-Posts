/*jshint esversion:6*/
import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import PostDetails from './PostDetails';
import DisplayComments from '../Comments/DisplayComments';
import DisplaySorter from '../Sort/DisplaySorter';
import AddCommentButton from '../Comments/utils/AddCommentButton';
import { detailedPostViewActive, detailedPostViewNotActive, isLoading, isNotLoading } from '../../actions/ActiveViewAction';
import { fetchPostDetails, removePost } from '../../actions/PostsAction';
import { updateSort, sortComments } from '../../actions/CommentsAction';

class PostDetailView extends React.Component {

deletePostfunction(post){
  this.props.removePost(post);
  this.props.history.goBack();
  console.log('delete');
}

  render() {
    const post = this.props.CurrentPosts[0];
    return post ?(
      <div className="Post-Detail-Page">
        <div>
          <Button onClick={() => this.props.history.goBack()}>Back</Button>
        </div>
        <div className="detailed-post">
          <PostDetails post={post} deletePostfunction={this.deletePostfunction.bind(this, post.id)}/>
        </div>
        <div className="comments">
          <DisplaySorter parentId={post.id} sortfunction={this.props.updateSort.bind(this, post.id)}/>
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

const mapStateToProps = (state) => {
  return {
    CurrentPosts: state.postsReducer.CurrentPosts,
    isLoading: state.activeViewReducer.isLoading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchPostDetails: (post) => {
      dispatch(fetchPostDetails(post));
      dispatch(isNotLoading());
    },
    updateSort: (parentId, sortMethod) => {
      dispatch(updateSort(parentId, sortMethod));
      dispatch(sortComments(parentId));
    },
    detailedPostViewActive: () => dispatch(detailedPostViewActive()),
    isLoading: () => dispatch(isLoading()),
    isNotLoading: () => dispatch(isNotLoading()),
    removePost: (id) => {
      dispatch(isLoading());
      dispatch(removePost(id));
      dispatch(detailedPostViewNotActive());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailView);

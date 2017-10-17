/*jshint esversion:6*/
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostDetails from './PostDetails';
import DisplayComments from '../Comments/DisplayComments';
import DisplaySorter from '../Sort/DisplaySorter';
import CustomButton from '../utils/CustomButton';
import { isLoading } from '../../actions/ActiveViewAction';
import { removePost } from '../../actions/PostsAction';
import { updateCommentSort } from '../../actions/CommentsAction';
import ErrorPage from '../ErrorPage';
import { Glyphicon } from 'react-bootstrap';
import { openCommentForm, updateParentID, updateCommentID, isExistingComment } from '../../actions/EditCommentAction';
import { makeID, uniqueID } from '../../utils/MakeID';

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
    const { sortedby, IDsUsed } = this.props.commentsReducer;
    const post = CurrentPosts[0];
    return post ?(
      <div className="Post-Detail-Page">
        <div className="Detailed-Post">
          <PostDetails post={post} deletePostfunction={this.deletePost.bind(this, post.id, this.home.bind(this))}/>
          <DisplaySorter parentId={post.id} sortedby={sortedby} sortfunction={this.props.updateCommentSort.bind(this)}/>
          <DisplayComments parentId={post.id} />
          <CustomButton style={{display: 'block', margin: 5}} onPress={this.props.openCommentForm.bind(this, IDsUsed, post.id)}><Glyphicon glyph="plus"/> Add</CustomButton>
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
    },
    openCommentForm: (IDsUsed, parentId) => {
      var newID = makeID();
      var id = uniqueID(newID, IDsUsed);
      dispatch(updateCommentID(id));
      dispatch(updateParentID(parentId));
      dispatch(openCommentForm());
      dispatch(isExistingComment(false));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailView);

/*jshint esversion:6*/
import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import PostDetails from './PostDetails';
import DisplayComments from '../Comments/DisplayComments';
import DisplaySorter from '../Sort/DisplaySorter';
import AddCommentButton from '../Comments/utils/AddCommentButton';
import PostForm from './PostForm';
import CommentForm from '../Comments/CommentForm';
import { detailedPostViewActive } from '../../actions/ActiveViewAction';
import { fetchPost } from '../../actions/PostsAction';
import { updateSort, sortComments } from '../../actions/CommentsAction';

class PostDetailView extends React.Component {

  componentDidMount() {
    this.props.fetchPost(this.props.params.postID);
    this.props.detailedPostViewActive();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.postID !== nextProps.params.postID) {
      this.props.fetchPost(nextProps.params.postID);
      this.props.detailedPostViewActive();
    }
  }

  render() {
    const { posts } = this.props;
    return this.props.posts.id ?(
      <div className="Post-Detail-Page">
        <div>
          <Button onClick={() => this.props.history.goBack()}>Back</Button>
        </div>
        <div className="detailed-post">
          <PostDetails post={posts} />
        </div>
        <div className="comments">
          <DisplaySorter parentId={posts.id} sortfunction={this.props.updateSort.bind(this, posts.id)}/>
          <DisplayComments parentId={posts.id} />
          <AddCommentButton parentId={posts.id} />
        </div>
        <PostForm />
        <CommentForm />
      </div>
    ):
    <div>
    <Button onClick={() => this.props.history.goBack()}>Back</Button>
    Error: Post Not Found
    </div>;
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.postsReducer.posts,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchPost: (post) => dispatch(fetchPost(post)),
    updateSort: (parentId, sortMethod) => {
      dispatch(updateSort(parentId, sortMethod));
      dispatch(sortComments(parentId));
    },
    detailedPostViewActive: () => dispatch(detailedPostViewActive()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailView);

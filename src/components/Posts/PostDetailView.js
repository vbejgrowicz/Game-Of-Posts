/*jshint esversion:6*/
import React from 'react';
import { connect } from 'react-redux';
import PostDetails from './PostDetails';
import DisplayComments from '../Comments/DisplayComments';
import { fetchPost } from '../../actions/ActiveViewAction';
import { detailedPostViewNotActive } from '../../actions/ActiveViewAction';
import DisplaySorter from '../Sort/DisplaySorter';
import AddCommentButton from '../Comments/utils/AddCommentButton';

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
          <DisplaySorter parentId={this.props.currentPost.id} />
          <DisplayComments parentId={this.props.currentPost.id} />
          <AddCommentButton parentId={this.props.currentPost.id} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentPost: state.activeViewReducer.post,
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

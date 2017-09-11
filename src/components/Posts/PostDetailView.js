/*jshint esversion:6*/
import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import PostDetails from './PostDetails';
import DisplayComments from '../Comments/DisplayComments';
import { detailedPostViewNotActive } from '../../actions/ActiveViewAction';
import DisplaySorter from '../Sort/DisplaySorter';
import AddCommentButton from '../Comments/utils/AddCommentButton';

class PostDetailView extends React.Component {

  render() {
    const { currentPost, detailedPostViewNotActive } = this.props;
    return (
      <div>
        <div>
          <Button onClick={() => detailedPostViewNotActive()}>Back</Button>
        </div>
        <div className="detailed-post">
          <PostDetails post={currentPost} />
        </div>
        <div className="comments">
          <DisplaySorter parentId={currentPost.id} />
          <DisplayComments parentId={currentPost.id} />
          <AddCommentButton parentId={currentPost.id} />
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
    detailedPostViewNotActive: () => dispatch(detailedPostViewNotActive()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailView);

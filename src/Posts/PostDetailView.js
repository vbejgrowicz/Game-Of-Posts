/*jshint esversion:6*/
import React from 'react';
import { connect } from 'react-redux';
import PostDetails from './PostDetails';
import { detailedPostViewNotActive } from '../actions/ActiveViewAction';


class PostDetailView extends React.Component {

  render() {
    console.log(this.props.post);
    return (
      <div>
        <div>
          <button onClick={() => this.props.detailedPostViewNotActive()}>Back</button>
        </div>
        <div className="detailed-post">
          <PostDetails post={this.props.post} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    post: state.activeViewReducer.post,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    detailedPostViewNotActive: () => {
      dispatch(detailedPostViewNotActive());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailView);

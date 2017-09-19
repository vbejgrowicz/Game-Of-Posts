/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import PostDetails from './PostDetails';
import { removePost } from '../../actions/PostsAction';

class DisplayPosts extends React.Component {

  deletePostfunction(post){
    this.props.removePost(post);
  }

  render() {
    const { CurrentPosts } = this.props;
    return CurrentPosts ? (
      <div className="Post-List">
        {CurrentPosts.map((post) => {
          return(
            <li className="Post-in-List" key={post.id}>
              <PostDetails post={post} deletePostfunction={this.deletePostfunction.bind(this, post.id)}/>
            </li>
          );
        })}
      </div>
    ):
    null;
  }
}

const mapStateToProps = (state) => {
  return {
    CurrentPosts: state.postsReducer.CurrentPosts,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    removePost: (id) => {
      dispatch(removePost(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayPosts);

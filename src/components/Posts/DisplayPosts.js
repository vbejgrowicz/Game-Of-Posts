/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import { removePost } from '../../actions/PostsAction';
import PostDetails from './PostDetails';

class DisplayPosts extends React.Component {

  deletePostfunction(post){
    this.props.removePost(post);
  }

  render() {
    const { CurrentPosts } = this.props.postsReducer;
    return CurrentPosts ? (
      <div className="Post-List">
        {CurrentPosts.map((post) => {
          return(
            <a href={'/'+ post.category.split(" ").join("_") + '/' + post.id} className="Post-in-List" key={post.id}>
              <PostDetails post={post} deletePostfunction={this.deletePostfunction.bind(this, post.id)}/>
            </a>
          );
        })}
      </div>
    ):
    null;
  }
}

function mapStateToProps({ postsReducer }) {
  return { postsReducer };
}

const mapDispatchToProps = (dispatch) => {
  return {
    removePost: (id) => {
      dispatch(removePost(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayPosts);

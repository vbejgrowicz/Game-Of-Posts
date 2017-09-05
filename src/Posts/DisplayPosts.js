/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import PostDetails from './PostDetails';
import { fetchComments } from '../actions/CommentsAction';

class DisplayPosts extends React.Component {

  render() {
      return this.props.posts ? (
          <div className="Post-List">
          {this.props.posts.map((post) => {
            this.props.getComments(post.id);
            return(
              <li className="Post" key={post.id}>
                <PostDetails post={post}/>
              </li>
            );
          })}
        </div>
        ): null;
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.postsReducer.posts,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getComments: (id) => dispatch(fetchComments(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayPosts);

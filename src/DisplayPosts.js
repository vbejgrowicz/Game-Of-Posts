/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import { fetchPosts } from './actions/PostsAction';

class DisplayPosts extends React.Component {


  render() {
      return this.props.posts ? (
          <div>
          {this.props.posts.map((post) => {
            return(
              <li className="Post-List" key={post.id}>
                <div>
                  {post.title}
                </div>
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
    getPosts: dispatch(fetchPosts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayPosts);

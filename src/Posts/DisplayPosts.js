/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import '../App.css';
import PostTitle from './PostTitle';
import PostAuthor from './PostAuthor';
import PostBody from './PostBody';
import PostTimestamp from './PostTimestamp';

class DisplayPosts extends React.Component {


  render() {
      return this.props.posts ? (
          <div>
          {this.props.posts.map((post) => {
            return(
              <li className="Post-List" key={post.id}>
                <div>
                  <PostTitle title={post.title}/>
                  <PostAuthor author={post.author}/>
                  <PostBody body={post.body}/>
                  <PostTimestamp timestamp={post.timestamp}/>

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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayPosts);

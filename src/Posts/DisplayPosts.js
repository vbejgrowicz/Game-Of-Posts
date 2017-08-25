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
          <div className="Post-List">
          {this.props.posts.map((post) => {
            return(
              <li className="Post" key={post.id}>
                <div className="Post-Data">
                  <PostTitle title={post.title}/>
                  <PostBody body={post.body}/>
                  <div className="post-date-and-author">
                    <PostTimestamp timestamp={post.timestamp}/>
                    &nbsp;by&nbsp;
                    <PostAuthor author={post.author}/>
                  </div>


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

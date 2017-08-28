/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import '../App.css';
import DisplayTitle from '../DisplayData/DisplayTitle';
import DisplayAuthor from '../DisplayData/DisplayAuthor';
import DisplayBody from '../DisplayData/DisplayBody';
import DisplayTimestamp from '../DisplayData/DisplayTimestamp';
import DisplayComments from './DisplayComments';
import { fetchComments } from '../actions/CommentsAction';


class DisplayPosts extends React.Component {

  render() {
      return this.props.posts ? (
          <div className="Post-List">
          {this.props.posts.map((post) => {
            this.props.getComments(post.id);
            return(
              <li className="Post" key={post.id}>
                <div className="Post-Data">
                  <DisplayTitle title={post.title} />
                  <DisplayBody body={post.body} />
                  <div className="post-date-and-author">
                    <DisplayTimestamp timestamp={post.timestamp} />
                    &nbsp;by&nbsp;
                    <DisplayAuthor author={post.author} />
                  </div>
                  <DisplayComments parentId = {post.id} />
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
    getComments: (id) => dispatch(fetchComments(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayPosts);

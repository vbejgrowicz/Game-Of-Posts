/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';

import DisplayTitle from '../DisplayData/DisplayTitle';
import DisplayAuthor from '../DisplayData/DisplayAuthor';
import DisplayBody from '../DisplayData/DisplayBody';
import DisplayTimestamp from '../DisplayData/DisplayTimestamp';
import DisplayNumComments from '../DisplayData/DisplayNumComments';
import DisplayVoteScore from '../DisplayData/DisplayVoteScore';
import DisplayPostDetails from './DisplayPostDetails';

import { fetchComments } from '../actions/CommentsAction';
import { openPostForm, updateID, updateTitle, updateBody, updateAuthor, updateCategory, isExistingPost } from '../actions/EditPostAction';

class DisplayPosts extends React.Component {

  render() {
      return this.props.posts ? (
          <div className="Post-List">
          {this.props.posts.map((post) => {
            this.props.getComments(post.id);
            return(
              <li className="Post" key={post.id} onClick={() => console.log(post.id)}>
                <DisplayVoteScore voteScore={post.voteScore} post={post.id}/>
                <div className="Post-Data">
                  <DisplayTitle title={post.title} />
                  <DisplayBody body={post.body} />
                  <div className="post-date-and-author">
                    <DisplayTimestamp timestamp={post.timestamp} />
                    &nbsp;by&nbsp;
                    <DisplayAuthor author={post.author} />
                  </div>
                  <DisplayNumComments parentId={post.id} />
                </div>
                <button onClick={() => this.props.openPostForm(post.id, post.title, post.body, post.author, post.category)}>Edit Post</button>
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
    openPostForm: (id, title, body, author, category) => {
      dispatch(updateID(id));
      dispatch(updateTitle(title));
      dispatch(updateBody(body));
      dispatch(updateAuthor(author));
      dispatch(updateCategory(category));
      dispatch(isExistingPost(true));
      dispatch(openPostForm());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayPosts);

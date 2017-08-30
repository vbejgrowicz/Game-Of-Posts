/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import { newPost } from './actions/PostsAction';

class AddPost extends React.Component {

  render() {
    var id = '8xf0y6ziyjabvozdd253zz';
    var timestamp = Date.now();
    var title = 'New Title';
    var body = 'New Body';
    var author = 'New Author';
    var category = 'udacity';
    return (
      <div className="Add-Post">
      <button onClick={() => this.props.newPost(id, timestamp, title, body, author, category)}>Add Post</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    newPost: (id, timestamp, title, body, author, category) => dispatch(newPost(id, timestamp, title, body, author, category)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);

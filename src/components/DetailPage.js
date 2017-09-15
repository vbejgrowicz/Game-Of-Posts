/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import PostForm from './Posts/PostForm';
import CommentForm from './Comments/CommentForm';

class DetailPage extends React.Component {

  render() {
    return (
      <div>
        {this.props.children}
        <PostForm />
        <CommentForm />
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage);

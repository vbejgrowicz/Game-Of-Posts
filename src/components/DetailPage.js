/*jshint esversion: 6*/
import React from 'react';
import PostForm from './Posts/PostForm';
import CommentForm from './Comments/CommentForm';
import DisplayCategories from './CategoryNavbar/DisplayCategories';

class DetailPage extends React.Component {

  render() {
    return (
      <div>
        <DisplayCategories />
        {this.props.children}
        <PostForm />
        <CommentForm />
      </div>
    );
  }
}

export default DetailPage;

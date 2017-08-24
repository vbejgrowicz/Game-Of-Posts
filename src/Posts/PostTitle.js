/*jshint esversion:6*/
import React from 'react';

class PostTitle extends React.Component {

  render() {
    return (
      <div className="title">{this.props.title}</div>
    );
  }
}

export default PostTitle;

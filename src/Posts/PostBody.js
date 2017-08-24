/*jshint esversion:6*/
import React from 'react';

class PostBody extends React.Component {

  render() {
    return (
      <div className="body">{this.props.body}</div>
    );
  }
}

export default PostBody;

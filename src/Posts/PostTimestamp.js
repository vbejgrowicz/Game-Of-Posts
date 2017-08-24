/*jshint esversion:6*/
import React from 'react';

class PostTimestamp extends React.Component {

  render() {
    return (
      <div className="timestamp">{this.props.timestamp}</div>
    );
  }
}

export default PostTimestamp;

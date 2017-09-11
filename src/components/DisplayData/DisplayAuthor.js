/*jshint esversion:6*/
import React from 'react';

class DisplayAuthor extends React.Component {

  render() {
    return (
      <div className="author">{this.props.author}</div>
    );
  }
}

export default DisplayAuthor;

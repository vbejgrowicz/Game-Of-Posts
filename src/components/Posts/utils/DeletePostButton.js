/*jshint esversion: 6*/
import React from 'react';
import { Button } from 'react-bootstrap';

class DeletePostButton extends React.Component {

  render() {
    return (
      <Button onClick={() => this.props.deletePostfunction()}>Delete Post</Button>
    );
  }
}

export default DeletePostButton;

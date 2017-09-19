/*jshint esversion: 6*/
import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

class DeletePostButton extends React.Component {

  render() {
    return (
      <div className="Remove-Button">
        <Button className="Custom-Button" onClick={() => this.props.deletePostfunction()}><Glyphicon glyph="remove"/> Delete</Button>
      </div>
    );
  }
}

export default DeletePostButton;

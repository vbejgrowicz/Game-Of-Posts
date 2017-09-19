/*jshint esversion: 6*/
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Glyphicon } from 'react-bootstrap';

class ErrorPage extends React.Component {

  render() {
    return (
      <div className="Error-Page">
        <div className="Error-Text">Sorry, the post you are looking for cannot be found!</div>
        <div className="Error-Image"></div>
        <Button className="Custom-Button" bsSize="large" onClick={() => this.context.router.push('/')}><Glyphicon glyph="home" /> Home</Button>
      </div>
    );
  }
}

ErrorPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default ErrorPage;

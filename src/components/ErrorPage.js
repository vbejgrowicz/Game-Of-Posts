/*jshint esversion: 6*/
import React from 'react';
import PropTypes from 'prop-types';

class ErrorPage extends React.Component {

  render() {
    return (
      <div className="Error-Page">
        <div className="Error-Text">Sorry, the post you are looking for cannot be found!</div>
        <div className="Error-Image"></div>
      </div>
    );
  }
}

ErrorPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default ErrorPage;

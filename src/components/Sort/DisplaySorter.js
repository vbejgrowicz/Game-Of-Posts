/* jshint esversion:6 */
import React from 'react';
import { Button } from 'react-bootstrap';

class DisplaySorter extends React.Component {

  render() {
    return(
      <div>
        <Button onClick={() => this.props.sortfunction("voteScore")}>sort by voteScore</Button>
        <Button onClick={() => this.props.sortfunction("timestamp")}>sort by timestamp</Button>
      </div>
    );
  }
}

export default DisplaySorter;

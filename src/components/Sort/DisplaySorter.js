/* jshint esversion:6 */
import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

class DisplaySorter extends React.Component {

  render() {
    return(
      <div className="Sort">
        <Button className="Custom-Button" active={this.props.sortedby === "voteScore"} onClick={() => this.props.sortfunction("voteScore")}><Glyphicon glyph="sort" /> Rating</Button>
        <Button className="Custom-Button" active={this.props.sortedby === "timestamp"} onClick={() => this.props.sortfunction("timestamp")}> <Glyphicon glyph="sort" /> Time</Button>
      </div>
    );
  }
}

export default DisplaySorter;

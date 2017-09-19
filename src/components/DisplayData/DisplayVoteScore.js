/*jshint esversion:6*/
import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

class DisplayVoteScore extends React.Component {

  render() {
    const { comment, post, voteEvent, voteScore } = this.props;
    return(
      <div className="Vote-Score">
        <Button className="Vote-Button" bsStyle="link" bsSize="large" onClick={() => voteEvent(comment || post, "upVote")}><Glyphicon glyph="thumbs-up"/></Button>
        <div className="Score">{voteScore}</div>
        <Button className="Vote-Button" bsStyle="link" bsSize="large" onClick={() => voteEvent(comment || post, "downVote")}><Glyphicon glyph="thumbs-down"/></Button>
      </div>
    );
  }
}

export default DisplayVoteScore;

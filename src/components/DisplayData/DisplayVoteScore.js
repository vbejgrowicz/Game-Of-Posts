/*jshint esversion:6*/
import React from 'react';
import { Button } from 'react-bootstrap';

class DisplayVoteScore extends React.Component {

  render() {
    const { comment, post, voteEvent, voteScore } = this.props;
    return(
      <div className="vote-score">
        <Button onClick={() => voteEvent(comment || post, "upVote")}>Vote Up</Button>
        {voteScore}
        <Button onClick={() => voteEvent(comment || post, "downVote")}>Vote Down</Button>
      </div>
    );
  }
}

export default DisplayVoteScore;

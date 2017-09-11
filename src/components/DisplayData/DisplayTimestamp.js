/*jshint esversion:6*/
import React from 'react';
import DateCheck from '../../utils/DateCheck';

class DisplayTimestamp extends React.Component {

  render() {
    var currentTime = Date.now();
    var postedDate = new Date(this.props.timestamp);
    var timeDiff = (currentTime - postedDate);
    return timeDiff <= 86400000 ? (
      <div className="timestamp">{DateCheck(timeDiff)}</div>
    ):(
      <div className="timestamp">posted on {postedDate.toDateString()}</div>
    );
  }
}

export default DisplayTimestamp;

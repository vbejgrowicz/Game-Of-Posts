/*jshint esversion:6*/
import React from 'react';
import DateCheck from '../../utils/DateCheck';

class DisplayTimestamp extends React.Component {

  render() {
    const { timestamp } = this.props;
    const currentTime = Date.now();
    const postedDate = new Date(timestamp);
    const timeDiff = (currentTime - postedDate);
    return timeDiff <= 86400000 ? (
      <div className="timestamp">{DateCheck(timeDiff)}</div>
    ):(
      <div className="timestamp">posted on {postedDate.toDateString()}</div>
    );
  }
}

export default DisplayTimestamp;

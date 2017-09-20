/*jshint esversion:6*/
import React from 'react';
import { connect } from 'react-redux';


class DisplayBody extends React.Component {

  render() {
    const { detailedPostView } = this.props.activeViewReducer;
    return detailedPostView ?(
      <div className="body">{this.props.body}</div>
    ):(
      null
    );
  }
}

function mapStateToProps({ activeViewReducer }) {
  return { activeViewReducer };
}

export default connect(mapStateToProps, null)(DisplayBody);

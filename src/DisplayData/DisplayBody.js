/*jshint esversion:6*/
import React from 'react';
import { connect } from 'react-redux';


class DisplayBody extends React.Component {

  render() {
    return this.props.detailedPostView ?(
      <div className="body">{this.props.body}</div>
    ):(
      null
    );
  }
}

const mapStateToProps = (state) => {
  return {
    detailedPostView: state.activeViewReducer.detailedPostView,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayBody);

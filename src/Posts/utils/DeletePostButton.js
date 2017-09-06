/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import { removePost } from '../../actions/PostsAction';

class DeletePostButton extends React.Component {

  render() {
    return (
      <div className="Delete-Post">
        <button onClick={() => this.props.removePost(this.props.id)}>Delete Post</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    removePost: (post) => {
      dispatch(removePost(post));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeletePostButton);

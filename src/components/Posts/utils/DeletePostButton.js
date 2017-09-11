/*jshint esversion: 6*/
import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { removePost } from '../../../actions/PostsAction';

class DeletePostButton extends React.Component {

  render() {
    const { id, removePost } = this.props;
    return (
      <Button onClick={() => removePost(id)}>Delete Post</Button>
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

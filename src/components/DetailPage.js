/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import PostForm from './Posts/PostForm';
import CommentForm from './Comments/CommentForm';
import Loading from '../utils/Loading';

class DetailPage extends React.Component {

  render() {
    return this.props.isLoading ?(
      <Loading />
    ):(
      <div>
        {this.props.children}
        <PostForm />
        <CommentForm />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLoading: state.activeViewReducer.isLoading
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage);

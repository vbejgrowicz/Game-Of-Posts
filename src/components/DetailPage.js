/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import PostForm from './Posts/PostForm';
import CommentForm from './Comments/CommentForm';
import DisplayCategories from './CategoryNavbar/DisplayCategories';
import PostDetailView from './Posts/PostDetailView';
import { detailedPostViewActive } from '../actions/ActiveViewAction';
import { fetchPostDetails } from '../actions/PostsAction';
import { setParentID } from '../actions/CommentsAction';


class DetailPage extends React.Component {
  componentDidMount() {
    console.log(this.props.match)
    this.props.fetchPostDetails(this.props.match.params.postID);
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props.match)
    if (this.props.match.params.postID !== nextProps.match.params.postID) {
      this.props.fetchPostDetails(nextProps.match.params.postID);
    }
  }

  render() {
    return (
      <div>
        <DisplayCategories />
        <PostDetailView />
        <PostForm />
        <CommentForm />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPostDetails: (id) => {
      dispatch(setParentID(id));
      dispatch(detailedPostViewActive());
      dispatch(fetchPostDetails(id));
    },
  };
};


export default connect(null, mapDispatchToProps)(DetailPage);;

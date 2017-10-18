/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import DisplayPosts from './Posts/DisplayPosts';
import DisplaySorter from './Sort/DisplaySorter';
import { updatePostSort } from '../actions/PostsAction';
import { detailedPostViewNotActive } from '../actions/ActiveViewAction';
import CustomButton from './utils/CustomButton';
import PostForm from './Posts/PostForm';
import { Glyphicon } from 'react-bootstrap';
import { openPostForm, updateID, updateCategory, isExistingPost } from '../actions/EditPostAction';
import { makeID, uniqueID } from '../utils/MakeID';

class HomePage extends React.Component {
  componentDidMount() {
    this.props.detailedPostViewNotActive();
  }

  render() {
    const { sortedby } = this.props.postsReducer;
    const { updatePostSort, activeViewReducer, postsReducer } = this.props;
    const { category } = activeViewReducer;
    const { IDsUsed } = postsReducer;

    return (
      <div className="HomeContent">
        {this.props.children}
        <DisplaySorter sortedby={sortedby} sortfunction={updatePostSort.bind(this)}/>
        <DisplayPosts />
        <CustomButton style={{display: 'block', margin: 5}} onPress={this.props.openPostForm.bind(this, IDsUsed, category)}><Glyphicon glyph="plus"/> Add</CustomButton>
        <PostForm />
      </div>
    );
  }
}

function mapStateToProps({ postsReducer, activeViewReducer }) {
  return { postsReducer, activeViewReducer };
}

const mapDispatchToProps = (dispatch) => {
  return {
    updatePostSort: (sortMethod) => {
      dispatch(updatePostSort(sortMethod));
    },
    openPostForm: (IDsUsed, category) => {
      var newID = makeID();
      var id = uniqueID(newID, IDsUsed);
      dispatch(updateCategory(category));
      dispatch(updateID(id));
      dispatch(openPostForm());
      dispatch(isExistingPost(false));
    },
    detailedPostViewNotActive: () => dispatch(detailedPostViewNotActive()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

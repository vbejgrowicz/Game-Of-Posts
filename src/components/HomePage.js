/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import { Glyphicon } from 'react-bootstrap';
import DisplayPosts from './Posts/DisplayPosts';
import DisplaySorter from './Sort/DisplaySorter';
import DisplayCategories from './CategoryNavbar/DisplayCategories';
import CustomButton from './utils/CustomButton';
import PostForm from './Posts/PostForm';
import { updatePostSort } from '../actions/PostsAction';
import { openPostForm, updateID, updateCategory, isExistingPost } from '../actions/EditPostAction';
import { makeID, uniqueID } from '../utils/MakeID';
import { activeView, detailedPostViewNotActive } from '../actions/ActiveViewAction';
import { fetchCurrentPosts } from '../actions/PostsAction';

class HomePage extends React.Component {
  componentDidMount() {
    const { pathname } = this.props.location;
    let category;
    if (pathname === "/") {
      category = "home";
    } else {
       category = this.props.match.params.category.split("_").join(" ");
    }
    this.props.fetchCategoryPosts(category);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      let category;
      if (nextProps.location.pathname === "/") {
        category = "home";
      } else {
         category = nextProps.match.params.category.split("_").join(" ");
      }
      this.props.fetchCategoryPosts(category);
    }
  }
  render() {
    const { sortedby } = this.props.postsReducer;
    const { updatePostSort, activeViewReducer, postsReducer } = this.props;
    const { category } = activeViewReducer;
    const { IDsUsed } = postsReducer;

    return (
      <div className="HomeContent">
        <DisplayCategories />
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
    fetchCategoryPosts: (category) => {
      dispatch(detailedPostViewNotActive());
      dispatch(activeView(category));
      dispatch(fetchCurrentPosts(category));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

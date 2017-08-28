/*jshint esversion: 6*/
import { combineReducers } from 'redux';

import { categoriesReducer } from '../reducers/CategoriesReducer';
import { postsReducer } from '../reducers/PostsReducer';
import { activeViewReducer } from '../reducers/ActiveViewReducer';
import { commentsReducer } from '../reducers/CommentsReducer';

export default combineReducers({
  activeViewReducer,
  categoriesReducer,
  postsReducer,
  commentsReducer,
});

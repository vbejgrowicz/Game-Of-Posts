/*jshint esversion: 6*/
import {
  FETCH_POSTS,
  FETCH_CURRENT_POSTS,
  FETCH_POST_DETAILS,
  SORT_POSTS,
  UPDATE_POST_SORT,
  CHANGE_VOTESCORE,
  ADD_POST,
  EDIT_POST,
  DELETE_POST
} from '../actions/types';
import { sortByVoteScore, sortbyTimestamp } from '../utils/SortFunctions';

const initialState = {
  AllPosts: [],
  CurrentPosts: [],
  sortedby: "timestamp",
  IDsUsed: []
};

function getPostIDs(posts) {
  var list = [];
  posts.forEach(function(post) {
    list.push(post.id);
  });
  return list;
}

function postSort(posts, sortedby) {
  if (posts.length === undefined) {
    return posts;
  }
  else {
    var sorted = "";
    if (sortedby === "voteScore") {
      sorted = sortByVoteScore(posts);
    }
    else if (sortedby === "timestamp") {
      sorted = sortbyTimestamp(posts);
    }
    else {
      return console.log('invalid sort');
    }
    return sorted;
  }
}

function changeVote(posts, id, voteScore) {
  return posts.map((post) => {
    if (post.id === id) {
      return Object.assign({}, post, {
        voteScore: voteScore
      });
    }
  return post;
  });
}

const removeDeleted = (posts, id) => {
  return posts.filter((post) => {
    return post.id !== id;
  });
};

function filterAllDeleted(post) {
  return post.deleted !== true;
}

const filterPosts = (category, posts) => {
  if (category === "home") {
    return posts;
  }
  else {
    return posts.filter((post) => {
      return post.category === category;
    });
  }
};

const filterSelectedPost = (id, posts) => {
  return posts.filter((post) => {
    return post.id === id;
  });
};

function edit(posts, updatedPost) {
  return posts.map((post) => {
    if (post.id === updatedPost.id) {
      return Object.assign({}, post,
        updatedPost
        );
      }
    return post;
  });
}



export function postsReducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return Object.assign({}, state,
        {IDsUsed: getPostIDs(action.posts.filter(filterAllDeleted))},
        {AllPosts: action.posts}
      );
    case FETCH_CURRENT_POSTS:
      return Object.assign({}, state,
        {CurrentPosts: postSort(filterPosts(action.category, state.AllPosts), state.sortedby)}
      );
    case FETCH_POST_DETAILS:
      return Object.assign({}, state,
        {CurrentPosts: filterSelectedPost(action.id, state.AllPosts)}
      );
    case SORT_POSTS:
      return Object.assign({}, state,
        {CurrentPosts: postSort(state.CurrentPosts, state.sortedby),
      });
    case UPDATE_POST_SORT:
      return Object.assign({}, state,
        {sortedby: action.sortMethod},
        {CurrentPosts: postSort(state.CurrentPosts, action.sortMethod)}
      );
    case CHANGE_VOTESCORE:
      return Object.assign({}, state,
        {AllPosts: changeVote(state.AllPosts, action.id, action.voteScore)},
        {CurrentPosts: postSort(changeVote(state.CurrentPosts, action.id, action.voteScore), state.sortedby)}
    );
    case ADD_POST:
      return Object.assign({}, state,
        {IDsUsed: state.IDsUsed.concat(action.newPost.id)},
        {AllPosts: state.AllPosts.concat(action.newPost)},
        {CurrentPosts: postSort(filterPosts(action.category, state.CurrentPosts.concat(action.newPost)), state.sortedby),
      }
    );
    case EDIT_POST:
    return Object.assign({}, state,
      {AllPosts: edit(state.AllPosts, action.updatedPost)},
      {CurrentPosts: edit(state.CurrentPosts, action.updatedPost)}
    );
    case DELETE_POST:
      return Object.assign({}, state,
        {IDsUsed: state.IDsUsed.filter(function(id) {return (id !== action.id);})},
        {AllPosts: removeDeleted(state.AllPosts, action.id)},
        {CurrentPosts: removeDeleted(state.CurrentPosts, action.id)}
    );
    default:
    return state;
  }
}

/*jshint esversion: 6*/
import {
  FETCH_IDS,
  FETCH_POSTS,
  FETCH_POST,
  SORT_POSTS,
  UPDATE_SORT,
  CHANGE_VOTESCORE,
  ADD_POST,
  EDIT_POST,
  DELETE_POST
} from '../actions/PostsAction';
import { sortByVoteScore, sortbyTimestamp } from '../utils/SortFunctions';

const initialState = {
  posts: [],
  sortedby: "voteScore",
  IDsUsed: []
};

function getPostIDs(posts) {
  var list = [];
  posts.forEach(function(post) {
    list.push(post.id);
  });
  return list;
}

function sortPosts(posts, sortedby) {
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
  if (posts.id === id) {
    return Object.assign({}, posts, {
      voteScore: voteScore
    });
  }
  else {
    return posts.map((post) => {
      if (post.id === id) {
        return Object.assign({}, post, {
          voteScore: voteScore
        });
      }
    return post;
    });
  }
}

function filterDeleted(posts,id) {
  if (posts.length > 0) {
    posts.filter(function(post) {
      return (post.id !== id);
    });
  }
  else {
    return {};
  }
}




export function postsReducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_IDS:
      return Object.assign({}, state,
        {IDsUsed: getPostIDs(action.postIDs)}
      );
    case FETCH_POSTS:
      return Object.assign({}, state,
        {posts: action.posts.filter(function(post) {return (post.deleted !== true);}),
      });
    case FETCH_POST:
      return Object.assign({}, state,
        {posts: action.posts}
      );
    case SORT_POSTS:
      return Object.assign({}, state,
        {posts: sortPosts(state.posts, state.sortedby),
      });
    case UPDATE_SORT:
      return Object.assign({}, state,
        {sortedby: action.sortMethod}
      );
    case CHANGE_VOTESCORE:
      return Object.assign({}, state,
        {posts: changeVote(state.posts, action.id, action.voteScore)}
    );
    case ADD_POST:
      return Object.assign({}, state,
        {IDsUsed: state.IDsUsed.concat(action.newPost.id)},
        {posts: sortPosts(state.posts.concat(action.newPost), state.sortedby),
      }
    );
    case EDIT_POST:
    return Object.assign({}, state,
      {posts: state.posts.map((post) => {
        if (post.id === action.id) {
          return Object.assign({}, post,
            action.updatedPost
            );
          }
        return post;
        })
      }
    );
    case DELETE_POST:
      return Object.assign({}, state,
        {IDsUsed: state.IDsUsed.filter(function(id) {return (id !== action.id);})},
        {posts: filterDeleted(state.posts, action.id)
      }
    );
    default:
    return state;
  }
}

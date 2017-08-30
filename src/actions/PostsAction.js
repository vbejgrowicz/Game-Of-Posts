/*jshint esversion: 6*/
import { getPosts, getCategoryPosts, updateVoteScore } from '../utils/DataFetch';
import { sortByVoteScore, sortbyTimestamp } from '../utils/SortFunctions';


export const FETCH_POSTS = "FETCH_POSTS";
export const SORT_POSTS = "SORT_POSTS";
export const CHANGE_VOTESCORE = "CHANGE_VOTESCORE";

export function fetchPosts() {
  return function fetchPostsThunk(dispatch) {
    getPosts().then(response => {
      var sorted = sortByVoteScore(response);
      dispatch({type: FETCH_POSTS, posts: sorted});
    });
  };
}

export function fetchCategoryPosts(category) {
  return function fetchCategoryPostsThunk(dispatch) {
    getCategoryPosts(category).then(response => {
      var sorted = sortByVoteScore(response);
      dispatch({type: FETCH_POSTS, posts: sorted});
    });
  };
}

export function voteScoreSort(posts) {
  return function voteScoreSortThunk(dispatch) {
    var sorted = sortByVoteScore(posts);
    dispatch({type: SORT_POSTS, posts:sorted, sort:"voteScore"});
  };
}

export function timestampSort(posts) {
  return function timestampSortThunk(dispatch) {
    var sorted = sortbyTimestamp(posts);
    dispatch({type: SORT_POSTS, posts:sorted, sort:"timestamp"});
  };
}
// 
// export function sort(sortMethod) {
//   return function sortThunk(dispatch) {
//     console.log(sortMethod);
//     var sorted = "";
//     if (sortMethod === "voteScore") {
//       sorted = sortByVoteScore(this.state.postsReducer.posts);
//     }
//     else if (sortMethod === "timestamp") {
//       sorted = sortbyTimestamp(this.state.postsReducer.posts);
//     }
//     else {
//       return console.log('invalid sort');
//     }
//     return dispatch({type: SORT_POSTS, posts:sorted, sort:sortMethod});
//   };
// }

export function changeVoteScore(post, vote) {
  return function changeVoteScoreThunk(dispatch) {
    updateVoteScore(post, vote).then(response => {
      var id = response.id;
      var voteScore = response.voteScore;
      dispatch({type: CHANGE_VOTESCORE, id: id, voteScore: voteScore });
    });
  };
}

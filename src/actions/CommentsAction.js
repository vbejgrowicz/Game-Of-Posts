/*jshint esversion: 6*/
import { getComments } from '../utils/DataFetch';
import { sortByVoteScore } from '../utils/SortFunctions';


export const FETCH_COMMENTS = "FETCH_COMMENTS";

export function fetchComments(id) {
  return function fetchCommentsThunk(dispatch) {
    getComments(id).then(response => {
      var sorted = sortByVoteScore(response);
      dispatch({type: FETCH_COMMENTS, id: id, comments: sorted});
      });
    };
  }

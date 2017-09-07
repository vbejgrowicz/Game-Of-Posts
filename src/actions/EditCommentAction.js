/*jshint esversion: 6*/
export const TOGGLE_COMMENT_FORM_OPEN = "TOGGLE_COMMENT_FORM_OPEN";
export const TOGGLE_COMMENT_FORM_CLOSED = "TOGGLE_COMMENT_FORM_CLOSED";
export const UPDATE_PARENT_ID = "UPDATE_PARENT_ID";
export const UPDATE_COMMENT_ID = "UPDATE_COMMENT_ID";
export const UPDATE_COMMENT_BODY = "UPDATE_COMMENT_BODY";
export const UPDATE_COMMENT_AUTHOR = "UPDATE_COMMENT_AUTHOR";
export const IS_EXISTING_COMMENT = "IS_EXISTING_COMMENT";

export function openCommentForm() {
  return {
    type: TOGGLE_COMMENT_FORM_OPEN,
    formOpen: true
  };
}

export function closeCommentForm() {
  return {
    type: TOGGLE_COMMENT_FORM_CLOSED,
    formOpen: false
  };
}

export function updateParentID(value) {
  return {
    type: UPDATE_PARENT_ID,
    parentId: value
  };
}

export function updateCommentID(value) {
  return {
    type: UPDATE_COMMENT_ID,
    id: value
  };
}

export function updateCommentBody(value) {
  return {
    type: UPDATE_COMMENT_BODY,
    body: value
  };
}

export function updateCommentAuthor(value) {
  return {
    type: UPDATE_COMMENT_AUTHOR,
    author: value
  };
}

export function isExistingComment(value) {
  return {
    type: IS_EXISTING_COMMENT,
    isExistingComment: value
  };
}

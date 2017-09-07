/*jshint esversion: 6*/
export const TOGGLE_COMMENT_FORM_OPEN = "TOGGLE_COMMENT_FORM_OPEN";
export const TOGGLE_COMMENT_FORM_CLOSED = "TOGGLE_COMMENT_FORM_CLOSED";
export const UPDATE_PARENT_ID = "UPDATE_PARENT_ID";
export const UPDATE_ID = "UPDATE_ID";
export const UPDATE_BODY = "UPDATE_BODY";
export const UPDATE_AUTHOR = "UPDATE_AUTHOR";
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

export function updateID(value) {
  return {
    type: UPDATE_ID,
    id: value
  };
}

export function updateBody(value) {
  return {
    type: UPDATE_BODY,
    body: value
  };
}

export function updateAuthor(value) {
  return {
    type: UPDATE_AUTHOR,
    author: value
  };
}

export function isExistingComment(value) {
  return {
    type: IS_EXISTING_COMMENT,
    isExistingComment: value
  };
}

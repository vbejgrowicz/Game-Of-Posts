/*jshint esversion: 6*/
export function openCommentForm() {
  return {
    type: 'TOGGLE_COMMENT_FORM_OPEN',
    formOpen: true
  };
}

export function closeCommentForm() {
  return {
    type: 'TOGGLE_COMMENT_FORM_CLOSED',
    formOpen: false
  };
}

export function updateParentID(value) {
  return {
    type: 'UPDATE_PARENT_ID',
    parentId: value
  };
}

export function updateCommentID(value) {
  return {
    type: 'UPDATE_COMMENT_ID',
    id: value
  };
}

export function updateCommentBody(value) {
  return {
    type: 'UPDATE_COMMENT_BODY',
    body: value
  };
}

export function updateCommentAuthor(value) {
  return {
    type: 'UPDATE_COMMENT_AUTHOR',
    author: value
  };
}

export function isExistingComment(value) {
  return {
    type: 'IS_EXISTING_COMMENT',
    isExistingComment: value
  };
}

/*jshint esversion: 6*/
export const TOGGLE_POST_FORM = "TOGGLE_POST_FORM";
export const UPDATE_ID = "UPDATE_ID";
export const UPDATE_TITLE = "UPDATE_TITLE";
export const UPDATE_BODY = "UPDATE_BODY";
export const UPDATE_AUTHOR = "UPDATE_AUTHOR";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export const IS_EXISTING_POST = "IS_EXISTING_POST";

export function openPostForm() {
  return {
    type: TOGGLE_POST_FORM,
    formOpen: true
  };
}

export function closePostForm() {
  return {
    type: TOGGLE_POST_FORM,
    formOpen: false
  };
}

export function updateID(value) {
  return {
    type: UPDATE_ID,
    id: value
  };
}

export function updateTitle(value) {
  return {
    type: UPDATE_TITLE,
    title: value
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

export function updateCategory(value) {
  return {
    type: UPDATE_CATEGORY,
    category: value
  };
}

export function isExistingPost(value) {
  return {
    type: IS_EXISTING_POST,
    isExistingPost: value
  };
}

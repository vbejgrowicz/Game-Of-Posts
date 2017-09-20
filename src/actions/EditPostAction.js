/*jshint esversion: 6*/
export function openPostForm() {
  return {
    type: 'TOGGLE_FORM_OPEN',
    formOpen: true
  };
}

export function closePostForm() {
  return {
    type: 'TOGGLE_FORM_CLOSED',
    formOpen: false
  };
}

export function updateID(value) {
  return {
    type: 'UPDATE_ID',
    id: value
  };
}

export function updateTitle(value) {
  return {
    type: 'UPDATE_TITLE',
    title: value
  };
}

export function updateBody(value) {
  return {
    type: 'UPDATE_BODY',
    body: value
  };
}

export function updateAuthor(value) {
  return {
    type: 'UPDATE_AUTHOR',
    author: value
  };
}

export function updateCategory(value) {
  return {
    type: 'UPDATE_CATEGORY',
    category: value,
  };
}

export function isExistingPost(value) {
  return {
    type: 'IS_EXISTING_POST',
    isExistingPost: value
  };
}

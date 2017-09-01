/*jshint esversion: 6*/
import {
  TOGGLE_POST_FORM,
  UPDATE_TITLE,
  UPDATE_BODY,
  UPDATE_AUTHOR,
  UPDATE_CATEGORY
} from '../actions/EditPostAction';

const initialState = {
  postFormOpen: false,
  post: {
    title: '',
    body: '',
    author: '',
    category: ''
  }
};

function assignTitle(state, action) {
  return Object.assign({}, state.post, {
    title: action.title
  });
}

function assignBody(state, action) {
  return Object.assign({}, state.post, {
      body: action.body
  });
}

function assignAuthor(state, action) {
  return Object.assign({}, state.post, {
      author: action.author
  });
}
function assignCategory(state, action) {
  return Object.assign({}, state.post, {
      category: action.category
  });
}

export function EditPostReducer (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_POST_FORM:
      return Object.assign({}, state, {
        postFormOpen: action.formOpen,
      }
    );
    case UPDATE_TITLE:
      return Object.assign({}, state, {
        post: assignTitle(state, action)
      }
    );
    case UPDATE_BODY:
      return Object.assign({}, state, {
        post: assignBody(state, action)
      }
    );
    case UPDATE_AUTHOR:
      return Object.assign({}, state, {
        post: assignAuthor(state, action)
      }
    );
    case UPDATE_CATEGORY:
      return Object.assign({}, state, {
        post: assignCategory(state, action)
      }
    );
    default:
    return state;
  }
}

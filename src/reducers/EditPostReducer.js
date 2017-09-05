/*jshint esversion: 6*/
import {
  TOGGLE_FORM_OPEN,
  TOGGLE_FORM_CLOSED,
  UPDATE_ID,
  UPDATE_TITLE,
  UPDATE_BODY,
  UPDATE_AUTHOR,
  UPDATE_CATEGORY,
  IS_EXISTING_POST
} from '../actions/EditPostAction';

const initialState = {
  postFormOpen: false,
  post: {
    isExistingPost: null,
    id: '',
    title: '',
    body: '',
    author: '',
    category: '',
  }
};

function assignID(state, action) {
  return Object.assign({}, state.post, {
    id: action.id
  });
}

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

function assignPostValue(state, action) {
  return Object.assign({}, state.post, {
      isExistingPost: action.isExistingPost
  });
}

export function EditPostReducer (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_FORM_OPEN:
      return Object.assign({}, state, {
        postFormOpen: action.formOpen,
      }
    );
    case TOGGLE_FORM_CLOSED:
      return Object.assign({}, state, {
        postFormOpen: action.formOpen,
        post: {
          isExistingPost: null,
          id: '',
          title: '',
          body: '',
          author: '',
          category: '',
        }
      }
    );
    case UPDATE_ID:
      return Object.assign({}, state, {
        post: assignID(state, action)
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
    case IS_EXISTING_POST:
      return Object.assign({}, state, {
        post: assignPostValue(state, action)
      }
    );
    default:
    return state;
  }
}

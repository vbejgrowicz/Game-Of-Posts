/*jshint esversion: 6*/
import {
  TOGGLE_COMMENT_FORM_OPEN,
  TOGGLE_COMMENT_FORM_CLOSED,
  UPDATE_PARENT_ID,
  UPDATE_ID,
  UPDATE_BODY,
  UPDATE_AUTHOR,
  IS_EXISTING_COMMENT
} from '../actions/EditCommentAction';

const initialState = {
  commentFormOpen: false,
  comment: {
    isExistingComment: null,
    id: '',
    parentId: '',
    body: '',
    author: '',
  }
};

function assignID(state, action) {
  return Object.assign({}, state.comment, {
    id: action.id
  });
}

function assignParentID(state, action) {
  return Object.assign({}, state.comment, {
    parentId: action.parentId
  });
}

function assignBody(state, action) {
  return Object.assign({}, state.comment, {
      body: action.body
  });
}

function assignAuthor(state, action) {
  return Object.assign({}, state.comment, {
      author: action.author
  });
}


function assignCommentValue(state, action) {
  return Object.assign({}, state.comment, {
      isExistingComment: action.isExistingComment
  });
}

export function EditCommentReducer (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_COMMENT_FORM_OPEN:
      return Object.assign({}, state, {
        commentFormOpen: action.formOpen,
      }
    );
    case TOGGLE_COMMENT_FORM_CLOSED:
      return Object.assign({}, state, {
        commentFormOpen: action.formOpen,
        comment: {
          isExistingComment: null,
          id: '',
          parentId: '',
          body: '',
          author: '',
        }
      }
    );
    case UPDATE_ID:
      return Object.assign({}, state, {
        comment: assignID(state, action)
      }
    );
    case UPDATE_PARENT_ID:
      return Object.assign({}, state, {
        comment: assignParentID(state, action)
      }
    );
    case UPDATE_BODY:
      return Object.assign({}, state, {
        comment: assignBody(state, action)
      }
    );
    case UPDATE_AUTHOR:
      return Object.assign({}, state, {
        comment: assignAuthor(state, action)
      }
    );
    case IS_EXISTING_COMMENT:
      return Object.assign({}, state, {
        comment: assignCommentValue(state, action)
      }
    );
    default:
    return state;
  }
}

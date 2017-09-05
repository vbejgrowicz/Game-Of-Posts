/*jshint esversion: 6*/
export const ACTIVE_CATEGORY = 'ACTIVE_CATEGORY';
export const DETAILED_POST_VIEW = 'DETAILED_POST_VIEW';
export const CURRENT_POST = 'CURRENT_POST';

export const activeView = category => {
  return {
    type: 'ACTIVE_CATEGORY',
    category
  };
};

export const detailedPostViewActive = () => {
  return {
    type: 'DETAILED_POST_VIEW',
    value: true
  };
};

export const detailedPostViewNotActive = () => {
  return {
    type: 'DETAILED_POST_VIEW',
    value: false
  };
};

export const currentPost = post => {
  return {
    type: 'CURRENT_POST',
    post
  };
};

/*jshint esversion: 6*/

export const ACTIVE_CATEGORY = 'ACTIVE_CATEGORY';
export const DETAILED_POST_VIEW = 'DETAILED_POST_VIEW';
export const IS_LOADING = 'IS_LOADING';

export const activeView = category => {
  return {
    type: 'ACTIVE_CATEGORY',
    category
  };
};

export const isLoading = () => {
  return {
    type: 'IS_LOADING',
    isLoading: true
  };
};

export const isNotLoading = () => {
  return {
    type: 'IS_LOADING',
    isLoading: false
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

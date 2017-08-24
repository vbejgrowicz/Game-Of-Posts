/*jshint esversion: 6*/
export const ACTIVE_CATEGORY = 'ACTIVE_CATEGORY';

export const activeView = category => {
  return {
    type: 'ACTIVE_CATEGORY',
    category
  };
};

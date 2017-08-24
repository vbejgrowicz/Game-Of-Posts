/*jshint esversion:6*/
var url = "http://localhost:5001";

export const getCategories = () =>
  fetch(url + '/categories', { headers: { 'Authorization': 'whatever-you-want' }})
    .then(res => res.json())
    .then(results => results.categories)
    .then(response => response.map((category) => category.name));

export const getPosts = () =>
  fetch(url + '/posts', { headers: { 'Authorization': 'whatever-you-want' }})
    .then(res => res.json());

export const getCategoryPosts = (category) =>
  fetch(url + '/' + category + '/posts', { headers: { 'Authorization': 'whatever-you-want' }})
    .then(res => res.json());

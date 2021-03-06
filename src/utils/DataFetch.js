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

export const getPost = (id) =>
  fetch(url + '/posts/' + id , { headers: { 'Authorization': 'whatever-you-want' }})
    .then(res => res.json());

export const getCategoryPosts = (category) =>
  fetch(url + '/' + category + '/posts', { headers: { 'Authorization': 'whatever-you-want' }})
    .then(res => res.json());

export const getComments = (id) =>
  fetch(url + '/posts/' + id +'/comments', { headers: { 'Authorization': 'whatever-you-want' }})
    .then(res => res.json());

export const updateVoteScore = (id, vote) =>
  fetch(url + '/posts/' + id, {
    method: 'POST',
    headers: { 'Authorization': 'whatever-you-want', 'Content-Type': 'application/json' },
    body: JSON.stringify({ option: vote })
  })
  .then(res => res.json());

export const updateCommentVoteScore = (id, vote) =>
  fetch(url + '/comments/' + id, {
    method: 'POST',
    headers: { 'Authorization': 'whatever-you-want', 'Content-Type': 'application/json' },
    body: JSON.stringify({ option: vote })
  })
  .then(res => res.json());

export const addPost = (id, timestamp, title, body, author, category) =>
  fetch(url + '/posts', {
    method: 'POST',
    headers: { 'Authorization': 'whatever-you-want', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: id,
      timestamp: timestamp,
      title: title,
      body: body,
      author: author,
      category: category
    })
  })
  .then(res => res.json());

export const updatePost = (id, title, body) =>
  fetch(url + '/posts/' + id, {
    method: 'PUT',
    headers: { 'Authorization': 'whatever-you-want', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: title,
      body: body,
    })
  })
  .then(res => res.json());

export const deletePost = (id) =>
  fetch(url + '/posts/' + id, {
    method: 'DELETE',
    headers: { 'Authorization': 'whatever-you-want', 'Content-Type': 'application/json' },
  })
  .then(res =>
    {if (res.ok) {
      return;
    }});

export const deleteComment = (id) =>
  fetch(url + '/comments/' + id, {
    method: 'DELETE',
    headers: { 'Authorization': 'whatever-you-want', 'Content-Type': 'application/json' },
  })
  .then(res =>
    {if (res.ok) {
      return;
    }});

export const addComment = (id, timestamp, body, author, parentId) =>
  fetch(url + '/comments', {
    method: 'POST',
    headers: { 'Authorization': 'whatever-you-want', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: id,
      timestamp: timestamp,
      body: body,
      author: author,
      parentId: parentId
    })
  })
  .then(res => res.json());

export const updateComment = (id, timestamp, body) =>
  fetch(url + '/comments/' + id, {
    method: 'PUT',
    headers: { 'Authorization': 'whatever-you-want', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      timestamp: timestamp,
      body: body,
    })
  })
  .then(res => res.json());

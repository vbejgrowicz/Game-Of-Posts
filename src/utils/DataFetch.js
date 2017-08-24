/*jshint esversion:6*/

var url = "http://localhost:5001/categories";

export const getCategories = () =>
  fetch(url, { headers: { 'Authorization': 'whatever-you-want' }})
    .then(res => res.json())
    .then(results => results.categories)
    .then(response => response.map((category) => category.name));

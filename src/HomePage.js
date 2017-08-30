/*jshint esversion: 6*/
import React from 'react';
import DisplayCategories from './CategoryNavbar/DisplayCategories';
import DisplayPosts from './Posts/DisplayPosts';
import DisplaySorter from './DisplaySorter';
import AddPost from './AddPost';
import './App.css';

class HomePage extends React.Component {

  render() {
    return (
      <div className="App">
        <DisplayCategories />
        <DisplaySorter />
        <DisplayPosts />
        <AddPost />
      </div>
    );
  }
}

export default HomePage;

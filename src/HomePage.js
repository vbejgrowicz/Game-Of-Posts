/*jshint esversion: 6*/
import React from 'react';
import DisplayCategories from './CategoryNavbar/DisplayCategories';
import DisplayPosts from './Posts/DisplayPosts';
import DisplaySorter from './Sort/DisplaySorter';
import AddPostButton from './Posts/utils/AddPostButton';
import './App.css';

class HomePage extends React.Component {

  render() {
    return (
      <div className="App">
        <DisplayCategories />
        <DisplaySorter />
        <DisplayPosts />
        <AddPostButton />
      </div>
    );
  }
}

export default HomePage;

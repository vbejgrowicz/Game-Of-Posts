/*jshint esversion: 6*/
import React from 'react';
import DisplayCategories from './CategoryNavbar/DisplayCategories';
import DisplayPosts from './Posts/DisplayPosts';
import './App.css';

class HomePage extends React.Component {

  render() {
    return (
      <div className="App">
        <DisplayCategories />
        <DisplayPosts />
      </div>
    );
  }
}

export default HomePage;

/*jshint esversion: 6*/
import React, { Component } from 'react';
import DisplayCategories from './DisplayCategories';
import DisplayPosts from './DisplayPosts';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <DisplayCategories />
        <DisplayPosts />
      </div>
    );
  }
}

export default App;

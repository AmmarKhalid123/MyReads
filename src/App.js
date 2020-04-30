import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import MainPage from './components/MainPageComponent';
import SearchPage from './components/SearchPageComponent';
import Books from './components/BookComponent';
import { Route, Link } from 'react-router-dom';

class BooksApp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      books: []
    };
  this.changeShelf = this.changeShelf.bind(this);
  }
  componentDidMount() {  
      BooksAPI.getAll().then((res) => this.setState({books: res}));
  }

  bookInShelves(bookId){
    if(this.state.books.filter((book) => book.id === bookId).length === 0){
      return false;
    }
    else {
      return true;
    }
  }

  changeShelf(bookId, shelfValue){
    if (shelfValue === 'none'){
      if (this.bookInShelves(bookId)){
        this.setState((current) => ({books: current.books.filter((book) => book.id !== bookId)}))
      }
      BooksAPI.get(bookId).then((book) => {
      BooksAPI.update(book, shelfValue);  })
      
    }
    else {
    BooksAPI.get(bookId).then((book) => {
      let i;
      if (this.bookInShelves(book.id)){ 
        this.state.books.forEach((bookk, index) => {
          if (bookk.id === bookId){
            i = index;
            return i;
          }
        });
        this.state.books[i].shelf = shelfValue;
        const books = this.state.books;
        this.setState({books});   
        BooksAPI.update(book, shelfValue);
      }
      else{
        book.shelf = shelfValue;
        this.setState((current) => ({books: current.books.concat(book)}));
        BooksAPI.update(book, shelfValue);
      }
    
  });}
  }
  

  render() {
    return (
      
      <div className="app">
        
          <Route path='/search' render={() => (
            <SearchPage handleShelfChange={this.changeShelf} booksInShelves={this.state.books} />
          )} />
          <Route exact path='/' render={() => (
            <MainPage books={this.state.books} handleShelfChange={this.changeShelf} />
          )} />

      </div>
    )
  }
}

export default BooksApp;
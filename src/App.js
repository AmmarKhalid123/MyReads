import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import MainPage from './components/MainPageComponent';
import SearchPage from './components/SearchPageComponent';
import { Route } from 'react-router-dom';

class BooksApp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      books: []
    };
    //TODO: HAD TO PASS AS A PROP MANY 
    //      TIMES HENCE BIND THIS ONCE AND FOR ALL HERE
  this.changeShelf = this.changeShelf.bind(this); 
  }

  componentDidMount() {  
      BooksAPI.getAll().then((res) => this.setState({books: res}));
  }
  
  // TODO: TO FIND WHETHER A BOOK IS IN THE THREE SHELVES OR NOT
  bookInShelves(bookId){
    if(this.state.books.filter((book) => book.id === bookId).length === 0){
      return false;
    }
    else {
      return true;
    }
  }


  changeShelf(bookId, shelfValue){
    //TODO: if user selected none..
    
    if (shelfValue === 'none'){
      // ..and book is in the shelves..
      if (this.bookInShelves(bookId)){
        // ..remove it from the shelves..
        this.setState((current) => ({books: current.books.filter((book) => book.id !== bookId)}))
      }
      // ..and update on the server
      BooksAPI.get(bookId).then((book) => {
      BooksAPI.update(book, shelfValue);  })
      
    }
    else {
    BooksAPI.get(bookId).then((book) => {
      let i;
      if (this.bookInShelves(book.id)){ 
        // TODO: if user selected an option of a book which
        // is in the given three shelves
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
        //TODO: if user selected an option of a book which
        // is not in the given three shelves
        book.shelf = shelfValue;
        this.setState((current) => ({books: current.books.concat(book)}));
        BooksAPI.update(book, shelfValue);
      }
  });}
  }
  

  render() {
    return (
      
      <div className="app">

          
        <Route exact path='/' render={() => (
          <MainPage books={this.state.books} handleShelfChange={this.changeShelf} />
        )} />
        <Route path='/search' render={() => (
          <SearchPage handleShelfChange={this.changeShelf} booksInShelves={this.state.books} />
        )} />

      </div>
    )
  }
}

export default BooksApp;
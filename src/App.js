import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
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
  bookInState(bookId){
    if(this.state.books.filter((book) => book.id === bookId).length === 0){
      return false;
    }
    else if (this.state.books.filter((book) => book.id === bookId).length > 0){
      return true;
    }
  }

  changeShelf(bookId, shelfValue){
    if (shelfValue === 'none'){
      if (this.bookInState(bookId)){
        this.setState((current) => ({books: current.books.filter((book) => book.id !== bookId)}))
      }
      BooksAPI.get(bookId).then((book) => {
      BooksAPI.update(book, shelfValue);  })
    }

    BooksAPI.get(bookId).then((book) => {
      if (this.state.books.indexOf(book) !== -1){ 
        this.state.books[this.state.books.indexOf(book)].shelf = shelfValue;
        const books = this.state.books;
        this.setState({books});   
        BooksAPI.update(book, shelfValue);
      }
      else{
        book.shelf = shelfValue;
        this.setState((current) => ({books: current.books.concat(book)}));
        BooksAPI.update(book, shelfValue);
      }
  });
  }
  

  render() {
    return (
      
      <div className="app">
        
          <Route path='/search' render={() => (
            <SearchPage handleShelfChange={this.changeShelf} />
          )} />

          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      <Books books={this.state.books} shelf="currentlyReading" handleShelfChange={this.changeShelf} />
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      <Books books={this.state.books} shelf="wantToRead" handleShelfChange={this.changeShelf} />
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    <Books books={this.state.books} shelf="read" handleShelfChange={this.changeShelf} />
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to='/search' className='open-search-link'>Add a book</Link>
            </div>
          </div>
        
      </div>
    )
  }
}

export default BooksApp;
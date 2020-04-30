import React from 'react';
import { Link } from 'react-router-dom';
import Books from './BookComponent';

export default function MainPage(props){
    return(
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
                      <Books books={props.books} shelf="currentlyReading" handleShelfChange={props.handleShelfChange} />
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      <Books books={props.books} shelf="wantToRead" handleShelfChange={props.handleShelfChange} />
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    <Books books={props.books} shelf="read" handleShelfChange={props.handleShelfChange} />
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to='/search' className='open-search-link'>Add a book</Link>
            </div>
          </div>
    );
}
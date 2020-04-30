import React, { useState, useEffect } from 'react';
import Books from './BookComponent';
import * as BooksAPI from '../BooksAPI';
import {Link} from 'react-router-dom';

export default function SearchPage(props) {
    const [books, changeBooks] = useState([]);
    const [query, updateQuery] = useState('');
    const allBooks = props.booksInShelves;
    const getShelf = (bookId) => {
      const reqBook = allBooks.filter(book => book.id === bookId);
      if (reqBook.length === 0){
        return 'none';
      }
      else {
        return reqBook[0].shelf;
      }
    };

    const changeQuery = (text) => {
        updateQuery(text);
    }
    const updateBooks = (bks) => {
      console.log(JSON.stringify(books));
      changeBooks(bks);
    }


    useEffect(() => {
      BooksAPI.search(query).then((books) => {
        if (Array.isArray(books) === true){  
          const newBooks = books.map((book) => {
          const shelff = getShelf(book.id);
          book.shelf = shelff;
          });
          console.log('agayaaaaa');
          console.log(books);
          updateBooks(newBooks);
        }
      })
    });

    return(
        <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to='/'>Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" value={query}
                onChange={(event) => changeQuery(event.target.value)} />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                <Books books={books} handleShelfChange={props.handleShelfChange} />
              </ol>
            </div>
          </div>
        
    );
}

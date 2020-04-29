import React, { useState, useEffect } from 'react';
import Books from './BookComponent';
import * as BooksAPI from '../BooksAPI';
import {Link} from 'react-router-dom';

export default function SearchPage(props) {
    const [books, changeBooks] = useState([]);
    const [query, updateQuery] = useState('');
    const changeQuery = (text) => {
        updateQuery(text);
    }
    const updateBooks = (bks) => {
        changeBooks(bks);
    }

    useEffect(() => {
        BooksAPI.search(query).then((books) => {
            if (Array.isArray(books) === true){
                updateBooks(books);
            }
        });
        
    })
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
                <Books books={books} />
              </ol>
            </div>
          </div>
        
    );
}
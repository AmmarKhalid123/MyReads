import React, { useState, useRef } from 'react';
import Books from './BookComponent';
import * as BooksAPI from '../BooksAPI';
import {Link} from 'react-router-dom';
import _ from "lodash";

export default function SearchPage(props) {
    const [books, changeBooks] = useState([]);
    const [query, updateQuery] = useState('');
    const allBooks = props.booksInShelves;
    
    const getShelf = (bookId) => {
      // getting the shelfValue of a book
      const reqBook = allBooks.filter(book => book.id === bookId);
      if (reqBook.length === 0){
        return 'none';
      }
      else {
        return reqBook[0].shelf;
      }
    };
    const delayedQuery = useRef(_.debounce(q => updateBooks(q), 500)).current;
    const changeQuery = (text) => {
        updateQuery(text);
        delayedQuery(text);
        // if (text === ''){
        //   updateBooks([]);
        // }
        // else{
        //   BooksAPI.search(query).then((books) =>{
        //     if (Array.isArray(books) === true){
        //       // console.log('query was => ', query);
    
        //       let newBooks = [];
        //       books.forEach((book) => {
        //         newBooks.push(Object.assign(book, {shelf: getShelf(book.id)}));
        //       }); 
        //       // console.log('newBooks are => ', books);
        //       updateBooks(newBooks);
        //     }
        //     });
        // }
    }
    const updateBooks = (query) => {
      if (query === ''){
        changeBooks([]);
      }
      else{
        BooksAPI.search(query).then((books) =>{
          if (Array.isArray(books) === true){
            // console.log('query was => ', query);
  
            let newBooks = [];
            books.forEach((book) => {
              newBooks.push(Object.assign(book, {shelf: getShelf(book.id)}));
            }); 
            // console.log('newBooks are => ', books);
            changeBooks(newBooks);
          }
          });
      }
      // changeBooks(bks);
    }


    // useEffect(() => {
    //   BooksAPI.search(query).then((books) =>{
    //     if (Array.isArray(books) === true){
    //       console.log('query was => ', query);

    //       let newBooks = [];
    //       books.forEach((book) => {
    //         newBooks.push(Object.assign(book, {shelf: getShelf(book.id)}));
    //       }); 
    //       console.log('newBooks are => ', books);
    //       updateBooks(newBooks);
    //     }
    //     });
    // });
    let textInput;
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
                <Books books={books} showAll={true} handleShelfChange={props.handleShelfChange} />
              </ol>
            </div>
          </div>
        
    );
}

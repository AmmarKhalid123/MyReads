import React from 'react';
import { Link } from 'react-router-dom';
import Shelf from './ShelfComponent';

export default function MainPage(props){
  const shelves = ['currentlyReading', 'wantToRead', 'read'];  
  return(
        <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {shelves.map((sshelf => 
                <Shelf shelf={sshelf} key={sshelf} books={props.books} handleShelfChange={props.handleShelfChange} />))}
              </div>
            </div>
            <div className="open-search">
              <Link to='/search' className='open-search-link'>Add a book</Link>
            </div>
          </div>
    );
}
import React from 'react';
import { Link } from 'react-router-dom';
import Shelf from './ShelfComponent';

export default function MainPage(props){
    return(
        <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Shelf shelf='currentlyReading' books={props.books} handleShelfChange={props.handleShelfChange} />
                <Shelf shelf='wantToRead' books={props.books} handleShelfChange={props.handleShelfChange} />
                <Shelf shelf='read' books={props.books} handleShelfChange={props.handleShelfChange} />
              </div>
            </div>
            <div className="open-search">
              <Link to='/search' className='open-search-link'>Add a book</Link>
            </div>
          </div>
    );
}
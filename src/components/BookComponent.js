import React, { useState, useEffect } from 'react';

export default function Books(props) {
    const [shelf, changeShelf] = useState('');
    const books = props.books;
    
    const updateShelf = (val) => {
        changeShelf(val);
    }
    useEffect(updateShelf(props.shelf));

    if (books.length === 0){
        return(
            <div></div>
        );
    }
    else{
        console.log("SHOULD BE A LIST",books);
        return(
            books.map((book) => <li>
                            <div className="book">
                              <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                                <div className="book-shelf-changer">
                                  <select>
                                    <option value="move" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                  </select>
                                </div>
                              </div>
                              <div className="book-title">{book.title}</div>
                              <div className="book-authors">{book.authors}</div>
                            </div>            
            </li>)
        );
    }
    
}
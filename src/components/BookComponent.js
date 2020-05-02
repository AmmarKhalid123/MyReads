import React from 'react';

export default function Books(props) {
    const allBooks = props.books;
    if (allBooks.length === 0){
        return(
            <div></div>
        );
    }

    else{
        return(
            allBooks.filter((book) => (props.showAll || book.shelf === props.shelf)).map((book) => <li key={book.id}>
                            <div className="book">
                              <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks ? book.imageLinks.thumbnail : ''}")` }}></div>
                                <div className="book-shelf-changer">
                                  <select defaultValue={book.shelf} onChange={(event) => props.handleShelfChange(book.id, event.target.value)}>
                                    <option value="move" disabled>Move to...</option>
                                    <option value="currentlyReading" >Currently Reading</option>
                                    <option value="wantToRead" >Want to Read</option>
                                    <option value="read" >Read</option>
                                    <option value="none">None</option>
                                  </select>
                                </div>
                              </div>
                              <div className="book-title">{book.title}</div>
                              <div className="book-authors">{book.authors ? book.authors.map(author => author) : ''}</div>
                            </div>            
            </li>)
        );
      
    }
    
}

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
                            {console.log('shelf: ',book.shelf, '   book  ',book)}
                            <div className="book">
                              <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks ? book.imageLinks.thumbnail : ''}")` }}></div>
                                <div className="book-shelf-changer">
                                  <select>
                                    <option value="move" disabled>Move to...</option>
                                    <option value="currentlyReading" selected={book.shelf==='currentlyReading'} onClick={(event) => props.handleShelfChange(book.id, event.target.value)}>Currently Reading</option>
                                    <option value="wantToRead" selected={book.shelf==='wantToRead'} onClick={(event) => props.handleShelfChange(book.id, event.target.value)}>Want to Read</option>
                                    <option value="read" selected={book.shelf==='read'} onClick={(event) => props.handleShelfChange(book.id, event.target.value)}>Read</option>
                                    <option value="none" selected={book.shelf==='none'} onClick={(event) => props.handleShelfChange(book.id, event.target.value)}>None</option>
                                  </select>
                                </div>
                              </div>
                              <div className="book-title">{book.title}</div>
                              <div className="book-authors">{book.authors ? book.authors.map(author => <li>{author}</li>) : ''}</div>
                            </div>            
            </li>)
        );
      
    }
    
}

import React, {useState, useEffect} from 'react';
import Books from './BookComponent';

export default function Shelf(props){
    const [shelfTitle, setShelf] = useState('');

    const setTitle = (val) => {
        setShelf(val);
    };

    useEffect(() => {
        if (props.shelf === 'currentlyReading'){
            setTitle('Currently Reading');
        }
        else if(props.shelf === 'wantToRead'){
            setTitle('Want to Read');
        }
        else if(props.shelf === 'read'){
            setTitle('Read')
        }
    });

    return(
        <div className="bookshelf">
                  <h2 className="bookshelf-title">{shelfTitle}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      <Books books={props.books} key={props.shelf} shelf={props.shelf} handleShelfChange={props.handleShelfChange} />
                    </ol>
                  </div>
                </div>
    );
}
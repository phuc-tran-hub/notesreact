import React, { useState } from 'react';
// import { produce } from 'immer';
import { addNote } from '../services/datastore';

function SearchBar(props) {
  const [titleterm, setTitleTerm] = useState('');
  const [count, setCount] = useState(0);

  const onInputChange = (event) => {
    setTitleTerm(event.target.value);
  };

  function handleClick() {
    const newData = {
      title: titleterm,
      text: '',
      x: Math.floor(Math.random() * (200 - 150) + 150),
      y: Math.floor(Math.random() * (20 - 0) + 0),
      zIndex: count,
    };

    addNote(newData);
    setTitleTerm('');
    setCount(count + 1);
  }

  return (
    <div id="search-bar">
      <div className="searchsection">
        <input onChange={onInputChange} value={titleterm} />
        <button type="button"
          onClick={handleClick}
          style={{
            backgroundColor: 'white',
          }}
          aria-label="Add"
        >
          Add New Note
        </button>
      </div>
    </div>
  );
}

export default SearchBar;

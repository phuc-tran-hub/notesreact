import React, { useState, useEffect } from 'react';

import SearchBar from './search_bar';
import NotesList from './notes_list';
import { onNotesValueChange } from '../services/datastore';

function App(props) {
  const [notes, setNotes] = useState({});

  useEffect(() => {
    onNotesValueChange(setNotes);
  }, [onNotesValueChange]);

  return (
    <div>
      <div>
        <div id="search-bar">
          <SearchBar onNotes={setNotes} />
        </div>
      </div>

      <div>
        <div id="notes-list">
          <NotesList onNotes={setNotes} onNotesList={notes} />
        </div>
      </div>

    </div>
  );
}

export default App;

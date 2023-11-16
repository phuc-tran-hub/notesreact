import React from 'react';
import NoteDetail from './notes_detail';

function NotesList(props) {
  function renderNoteItems() {
    if (props.onNotesList) {
      return (
        Object.entries(props.onNotesList).map(([id, note]) => {
          return <NoteDetail key={id} id={id} note={note} onNotes={props.onNotes} />;
        })
      );
    } else {
      return null;
    }
  }
  return (
    <div>
      {renderNoteItems()}
    </div>
  );
}

export default NotesList;

import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
// ^ we are using compat notation here as the new firebase 9 api is a mess and i kinda hate it

const firebaseConfig = {
  apiKey: 'AIzaSyCHoO3gPk_g9AcqmyyCTKudwKnUx1PuHNM',
  authDomain: 'firenotes-8dabf.firebaseapp.com',
  databaseURL: 'https://firenotes-8dabf-default-rtdb.firebaseio.com',
  projectId: 'firenotes-8dabf',
  storageBucket: 'firenotes-8dabf.appspot.com',
};
firebase.initializeApp(firebaseConfig);

export function onNotesValueChange(callback) {
  firebase.database().ref('notes').on('value', (snapshot) => {
    const newNoteState = snapshot.val();
    // do something with new note state
    callback(newNoteState);
  });
}

export function removeNote(noteId) {
  firebase.database().ref('notes').child(noteId).remove();
}

export function updateNote(noteId, oldNote, newText) {
  const postNote = oldNote;
  postNote.text = newText;
  firebase.database().ref('notes').child(noteId).update(postNote);
}

export function updateNoteposition(noteId, oldNote, newX, newY) {
  const postNote = oldNote;
  postNote.x = newX;
  postNote.y = newY;
  firebase.database().ref('notes').child(noteId).update(postNote);
}

export function addNote(noteData) {
  const notesRef = firebase.database().ref('notes');
  const newNoteRef = notesRef.push();
  const newNoteData = noteData;
  newNoteRef.set(newNoteData)
    .then(() => {
      console.log('New note added successfully');
    })
    .catch((error) => {
      console.error('Error adding new note:', error);
    });
}

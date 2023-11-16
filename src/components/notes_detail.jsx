import React, { useState } from 'react';
import Markdown from 'react-markdown';
import Draggable from 'react-draggable'; // Both at the same time

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faCheck } from '@fortawesome/free-solid-svg-icons';
import TextareaAutosize from 'react-textarea-autosize';
import { removeNote, updateNote, updateNoteposition } from '../services/datastore';

function NoteDetail(props) {
  const [isEditing, setEditing] = useState(false);
  const [textareaValue, setTextareaValue] = useState('');

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };

  function handleDelete() {
    removeNote(props.id);
  }

  function handleEdit() {
    updateNote(props.id, props.note, textareaValue);
    setEditing(!isEditing);
  }

  const handleDrag = (e, data) => {
    updateNoteposition(props.id, props.note, data.x, data.y);
  };

  const renderEdit = () => {
    if (isEditing) {
      return (
        <div className="edit">
          <button type="button"
            onClick={handleEdit}
            style={{
              backgroundColor: 'white',
              borderWidth: '0',
            }}
          >
            <FontAwesomeIcon icon={faCheck} />
          </button>

        </div>
      );
    } else {
      return (
        <div className="edit">
          <button type="button"
            onClick={handleEdit}
            style={{
              backgroundColor: 'white',
              borderWidth: '0',
            }}
          >
            <FontAwesomeIcon icon={faPen} />
          </button>
        </div>
      );
    }
  };

  const renderTextbox = () => {
    if (isEditing) {
      return (
        <div className="texteditarea">
          <TextareaAutosize
            onChange={handleTextareaChange}
            placeholder="Insert New Text"
            defaultValue={props.note.text}
          />
        </div>
      );
    } else {
      return (
        <Markdown className="text">{props.note.text || ''}</Markdown>
      );
    }
  };

  return (
    <Draggable
      onDrag={handleDrag}
      position={{
        x: props.note.x, y: props.note.y,
      }}
    >
      <div>
        <div id={props.id} className="note">
          <div className="titlebar">
            <div className="title"> {props.note.title} </div>

            <button type="button"
              onClick={handleDelete}
              style={{
                backgroundColor: 'white',
                borderWidth: '0',
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>

            {renderEdit()}
          </div>

          {renderTextbox()}

        </div>
      </div>
    </Draggable>
  );
}

export default NoteDetail;

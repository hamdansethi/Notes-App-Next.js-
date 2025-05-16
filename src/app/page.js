'use client';
import React, { useState } from 'react';

export default function NotesApp() {
  const [notes, setNotes] = useState([{ id: 1, title: 'My First Note' }]);
  const [selectedNote, setSelectedNote] = useState(null);

  const handleAddNote = () => {
    const newNote = {
      id: Date.now(),
      title: `Untitled Note ${notes.length + 1}`,
    };
    setNotes([...notes, newNote]);
  };

  const handleSelectNote = (note) => {
    setSelectedNote(note);
  };

  return (
    <div className="flex h-screen text">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-100 p-4 border-r text-black">
        <h2 className="text-xl font-bold mb-4">Notes</h2>
        <ul className="mb-4 space-y-2">
          {notes.map((note) => (
            <li
              key={note.id}
              onClick={() => handleSelectNote(note)}
              className="cursor-pointer hover:bg-gray-200 px-2 py-1 rounded"
            >
              {note.title}
            </li>
          ))}
        </ul>
        <button
          onClick={handleAddNote}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Note
        </button>
      </div>

      {/* Main Area */}
      <div className="flex-1 p-6">
        {selectedNote ? (
          <div>
            <h2 className="text-2xl font-semibold mb-2">{selectedNote.title}</h2>
            <p className="text-gray-600">Note content will go here...</p>
          </div>
        ) : (
          <div className="text-gray-500 italic">Select a note to view its content</div>
        )}
      </div>
    </div>
  );
}

'use client';
import React, { useState } from 'react';

const Sidebar = () => {
  const [notes, setNotes] = useState([{ id: 1, title: 'My First Note' }]);

  const handleAddNote = (title) => {
    const newNote = {
      id: Date.now(),
      title: title,
    };
    setNotes([...notes, newNote]);
  };

  return (
    <div className="w-1/5 h-auto p-4 bg-gray-100">
      <h2 className="text-xl font-bold mb-4">Notes</h2>
      <ul className="mb-4">
        {notes.map((note) => (
          <li key={note.id} className="mb-2">
            {note.title}
          </li>
        ))}
      </ul>
      <button
        onClick={() => handleAddNote('Untitled Note')}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Note
      </button>
    </div>
  );
};

export default Sidebar;

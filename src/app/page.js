'use client';
import React, { useEffect, useState } from 'react';

export default function NotesApp() {
  const [notes, setNotes] = useState([{ id: 1, title: 'My First Note', content: '' }]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  // ✅ Load notes from localStorage in useEffect (runs on client only)
  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // ✅ Save notes to localStorage whenever notes change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('notes', JSON.stringify(notes));
    }
  }, [notes]);

  const selectedNote = notes.find(note => note.id === selectedNoteId);

  const handleAddNote = () => {
    const newNote = {
      id: Date.now(),
      title: `Untitled Note ${notes.length + 1}`,
      content: '',
    };
    setNotes([...notes, newNote]);
    setSelectedNoteId(newNote.id);
  };

  const handleSelectNote = (note) => {
    setSelectedNoteId(note.id);
  };

  const handleNoteChange = (field, value) => {
    const updatedNotes = notes.map(note =>
      note.id === selectedNoteId ? { ...note, [field]: value } : note
    );
    setNotes(updatedNotes);
  };

  const handleDeleteNote = (note) => {
    const answer = prompt(`Are you sure you want to delete "${note.title}"? (y/n)`);
    if (answer && answer[0].toLowerCase() === 'y') {
      setNotes(notes.filter(n => n.id !== note.id));
    }
  };

  return (
    <div className="flex h-screen text">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-100 p-4 border-r text-black flex flex-col">
        <h2 className="text-xl font-bold mb-4">Notes</h2>
        <div className="flex-1 overflow-y-auto mb-4 pr-1">
          <ul className="space-y-2">
            {notes.map((note) => (
              <li
                key={note.id}
                onClick={() => handleSelectNote(note)}
                className={`cursor-pointer px-2 py-1 rounded flex justify-between items-center ${
                  selectedNoteId === note.id ? 'bg-blue-200' : 'hover:bg-gray-200'
                }`}
              >
                <span>{note.title || 'Untitled'}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteNote(note);
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-0.5 px-2 rounded focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={handleAddNote}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        >
          Add Note
        </button>
      </div>

      {/* Main Area */}
      <div className="flex-1 p-6">
        {selectedNote ? (
          <div>
            <input
              type="text"
              value={selectedNote.title}
              onChange={(e) => handleNoteChange('title', e.target.value)}
              className="w-full text-2xl font-semibold mb-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
              placeholder="Note Title"
            />
            <textarea
              value={selectedNote.content}
              onChange={(e) => handleNoteChange('content', e.target.value)}
              className="w-full h-128 p-2 text-gray-300 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Write your note here..."
            />
          </div>
        ) : (
          <div className="text-gray-500 italic">Select a note to view its content</div>
        )}
      </div>
    </div>
  );
}

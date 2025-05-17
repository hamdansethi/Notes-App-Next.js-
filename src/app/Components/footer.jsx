'use client';
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 text-gray-500 text-sm py-3 px-6 text-center">
      <p>&copy; {new Date().getFullYear()} NotesApp. Built with ❤️</p>
    </footer>
  );
}

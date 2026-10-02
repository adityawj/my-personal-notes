import React from 'react';
import { showFormattedDate } from '../utils';


function NoteActionButton({ variant, onClick, children }) {
  return (
    <button
      className={`note-item__action-button note-item__action-button--${variant}`}
      type="button"
      onClick={onClick}
      data-testid={`note-item-${variant}-button`}
    >
      {children}
    </button>
  );
}

// Fungsi helper untuk menyorot teks (Advanced)
const highlightText = (text, keyword) => {
  if (!keyword || !text) return text;
  // Membuat regex case-insensitive untuk mencari keyword
  const regex = new RegExp(`(${keyword})`, 'gi');
  // Memecah teks berdasarkan keyword, lalu membungkus bagian yang cocok dengan <mark>
  return text.split(regex).map((part, index) =>
    regex.test(part) ? <mark key={index}>{part}</mark> : part
  );
};

function NoteItem({ note, onDelete, onArchive, searchKeyword = '' }) {
  return (
    <div
      className="note-item"
      data-testid="note-item"
      data-note-id={note?.id}
    >
      <div className="note-item__content" data-testid="note-item-content">
        {/* TODO [Basic] tampilkan judul catatan menggunakan note.title */}
        {/* TODO [Advanced] sorot kata kunci pencarian dalam judul menggunakan elemen <mark>. */}
        <h3 className="note-item__title" data-testid="note-item-title">
          {highlightText(note.title, searchKeyword)}
        </h3>
        {/* TODO [Basic] gunakan util showFormattedDate untuk menampilkan tanggal dibuat. */}
        <p className="note-item__date" data-testid="note-item-date">
          {showFormattedDate(note.createdAt)}
        </p>
        {/* TODO [Basic] tampilkan isi catatan dari note.body */}
        {/* TODO [Advanced] sorot kata kunci pencarian dalam isi menggunakan elemen <mark>. */}
        <p className="note-item__body" data-testid="note-item-body">
          {highlightText(note.body, searchKeyword)}
        </p>
      </div>
      <div className="note-item__action" data-testid="note-item-action">
        {/* TODO [Skilled] pecah tombol aksi menjadi komponen terpisah bernama `NoteActionButton` dengan menerima props `variant` dan `onClick` */}
        <NoteActionButton
          variant={note.archived ? 'unarchive' : 'archive'}
          onClick={() => onArchive(note.id)}
        >
          {note.archived ? 'Aktifkan' : 'Arsipkan'}
        </NoteActionButton>
        <button
          className="note-item__delete-button"
          type="button"
          // TODO [Basic] panggil onDelete dengan id catatan.
          onClick={() => onDelete(note.id)}
          data-testid="note-item-delete-button"
        >
          Delete
        </button>

        {/* TODO [Advanced] implementasikan tombol arsip untuk fitur mengarsipkan catatan */}
        <NoteActionButton
          variant={note.archived ? 'unarchive' : 'archive'}
          onClick={() => onArchive(note.id)}
        >
          {note.archived ? 'Aktifkan' : 'Arsipkan'}
        </NoteActionButton>
      </div>
    </div>
  );
}

export default NoteItem;

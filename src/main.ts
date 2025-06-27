import './style.css';
import type { Note } from './types';

const form = document.querySelector('#note-form') as HTMLFormElement;
const textarea = document.querySelector('#note-input') as HTMLTextAreaElement;
const notesList = document.querySelector('#notes-list') as HTMLElement;

let notes: Note[] = loadNotes();
renderNotes();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const content = textarea.value.trim();
  if (!content) return;

  const newNote: Note = {
    id: crypto.randomUUID(),
    content,
    createdAt: Date.now(),
  };

  notes.unshift(newNote);
  saveNotes();
  renderNotes();

  textarea.value = '';
  textarea.focus();
});

function renderNotes() {
  notesList.innerHTML = '';
  for (const note of notes) {
    const noteEl = document.createElement('div');
    noteEl.className = 'note';

    const contentEl = document.createElement('textarea');
    contentEl.value = note.content;
    contentEl.rows = 3;
    contentEl.addEventListener('input', () => {
      note.content = contentEl.value;
      saveNotes();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => {
      notes = notes.filter((n) => n.id !== note.id);
      saveNotes();
      renderNotes();
    };

    const actionsEl = document.createElement('div');
    actionsEl.className = 'note-actions';
    actionsEl.appendChild(deleteBtn);

    noteEl.appendChild(contentEl);
    noteEl.appendChild(actionsEl);
    notesList.appendChild(noteEl);
  }
}

function saveNotes() {
  localStorage.setItem('notes', JSON.stringify(notes));
}

function loadNotes(): Note[] {
  try {
    return JSON.parse(localStorage.getItem('notes') || '[]');
  } catch {
    return [];
  }
}

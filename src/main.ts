import "./style.css";
import type { Note } from "./types";

const form = document.querySelector("#note-form") as HTMLFormElement;
const textarea = document.querySelector("#note-input") as HTMLTextAreaElement;
const counterEl = document.querySelector("#char-count") as HTMLDivElement;
const searchInput = document.querySelector("#search-input") as HTMLInputElement;
const notesList = document.querySelector("#notes-list") as HTMLElement;

const MAX_WORDS = 1000;

const wordCount = (txt: string) =>
  txt.trim() ? txt.trim().split(/\s+/).length : 0;

function refreshInputMetrics() {
  counterEl.textContent = `${wordCount(textarea.value)} / ${MAX_WORDS} words`;
}
function autoGrow(el: HTMLTextAreaElement) {
  el.style.height = "auto";
  el.style.height = `${el.scrollHeight}px`;
}
function metaText(n: Note) {
  return `${new Date(n.createdAt).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  })} · ${wordCount(n.content)} words`;
}
function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}
function loadNotes(): Note[] {
  try {
    const raw = localStorage.getItem("notes");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    localStorage.removeItem("notes");
    return [];
  }
}
function handleDelete(id: string) {
  if (!confirm("Delete this note?")) return;
  notes = notes.filter((n) => n.id !== id);
  saveNotes();
  renderNotes();
}

let notes: Note[] = loadNotes();
let search = "";

searchInput.value = "";
refreshInputMetrics();
autoGrow(textarea);
renderNotes();
window.addEventListener("load", () => textarea.focus());

textarea.addEventListener("input", () => {
  refreshInputMetrics();
  autoGrow(textarea);
});
textarea.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    form.requestSubmit();
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const content = textarea.value.trim();
  if (!content) return;

  notes.unshift({ id: crypto.randomUUID(), content, createdAt: Date.now() });
  saveNotes();
  renderNotes();

  textarea.value = "";
  autoGrow(textarea);
  refreshInputMetrics();
  textarea.focus();
});

searchInput.addEventListener("input", () => {
  search = searchInput.value.toLowerCase();
  renderNotes();
});

function renderNotes() {
  notesList.innerHTML = "";

  const list = search
    ? notes.filter((n) => n.content.toLowerCase().includes(search))
    : notes;

  list.forEach((note) => {
    const card = document.createElement("div");
    card.className = "note";

    const contentEl = document.createElement("textarea");
    contentEl.value = note.content;
    autoGrow(contentEl);

    const saveStatus = document.createElement("div");
    saveStatus.className = "save-status";
    saveStatus.textContent = "Saved ✓";

    contentEl.addEventListener("input", () => {
      note.content = contentEl.value;
      autoGrow(contentEl);
      saveNotes();
      metaEl.textContent = metaText(note);
      saveStatus.classList.add("visible");
      setTimeout(() => saveStatus.classList.remove("visible"), 1500);
    });

    const footer = document.createElement("div");
    footer.className = "note-footer";

    const metaEl = document.createElement("div");
    metaEl.className = "note-meta";
    metaEl.textContent = metaText(note);

    const copyBtn = document.createElement("button");
    copyBtn.className = "copy-btn";
    copyBtn.textContent = "Copy";
    copyBtn.onclick = async () => {
      await navigator.clipboard.writeText(contentEl.value);
      copyBtn.textContent = "Copied!";
      setTimeout(() => (copyBtn.textContent = "Copy"), 1500);
    };

    const delBtn = document.createElement("button");
    delBtn.className = "delete-btn";
    delBtn.textContent = "Delete";
    delBtn.onclick = () => handleDelete(note.id);

    footer.append(metaEl, copyBtn, delBtn);
    card.append(contentEl, saveStatus, footer);
    notesList.appendChild(card);
  });

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => {
          console.log("[PWA] Service worker registered");
        })
        .catch(console.error);
    });
  }
}

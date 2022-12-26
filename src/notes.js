const crypto = require("crypto");

class Note {
  constructor() {
    this._notes = [];
  }

  addNote({ title, tags, body}) {
    this.#validatePost({ title, tags, body});

    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();
    
    this._notes.push({
      id, title, createdAt,
      updatedAt, tags, body,
    });

    console.log(this._notes, "this._notes");
    return id;
  }

  get getNotes() {
    if (!this._notes.length) return false;
    return this._notes;
  }

  find(id) {
    const { _notes: notes } = this;

    for (let i = 0; i < notes.length; i++) if (notes[i].id === id) return notes.at(i);
    return false;
  }

  updateNote(note, id) {
    return this.#updateOrDeleteNote(note, id,
      (note, index) => this._notes[index] = note);
  }

  deleteNote(id) {
    return this.#updateOrDeleteNote(null, id,
      (note, index) => this._notes.splice(index, 1));
  }

  #validatePost({ title, tags, body }) {
    if (typeof title !== "string") {
      throw new TypeError("title must be a string");
    }
    if (!Array.isArray(tags) || !tags.every(item => typeof item === "string")) {
      throw new TypeError("tags must be an array of strings");
    }
    if (typeof body !== "string") {
      throw new TypeError("body must be a string");
    }
  }


  #updateOrDeleteNote(note, id, updatefn) {
    for (let i = 0; i < this._notes.length; i++) {
      if (this._notes[i].id === id) {
        updatefn(note, i);
        return true;
      }
    }
    return false;
  }
}

const NotesManager = new Note();
module.exports = { NotesManager };
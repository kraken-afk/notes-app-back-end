const { NotesManager } = require("./notes");

function rootHandler(request, h) {
  return h.response({
    status: "fail",
    message: "Forbidden"
  })
    .code(403)
    .type("application/json");
}

const NotesHanlder = {

  post: (request, h) => {
    const { title, tags, body } = request.payload;

    try {
      const id = NotesManager.addNote({ title, tags, body });

      return h.response({
        status: "success",
        message: "Catatan berhasil ditambahkan",
        data: {
          noteId: id
        }
      })
        .code(201)
        .type("application/json");

    } catch (error) {

      return h.response({
        status: "error",
        message: "Catatan gagal untuk ditambahkan"
      })
        .code(500)
        .type("application/json");
    }
  },

  get: (request, h) => {
    const { id } = request.params;

    // if request have id param
    if (id !== undefined) {
      const currentNote = NotesManager.find(id);

      if (currentNote instanceof Object)

        return h.response({
          status: "success",
          data: {
            note: currentNote
          }
        })
          .code(200)
          .type("application/json");
      else
        return h.response({
          status: "fail",
          message: "Catatan tidak ditemukan"
        })
          .code(404)
          .type("application/json");
    }

    // if request dont have any params
    const notes = NotesManager.getNotes || [];
    return h.response({
      status: "success",
      data: {
        notes: notes
      }
    })
      .code(200)
      .type("application/json");
  },

  put: (request, h) => {
    const { id } = request.params;
    const { title, tags, body } = request.payload;
    const currentNote = NotesManager.find(id);
    const updatedAt = new Date().toISOString();

    currentNote.title = title;
    currentNote.tags = tags;
    currentNote.body = body;
    currentNote.updatedAt = updatedAt;

    const updateResult = NotesManager.updateNote(currentNote, id);

    if (updateResult) {
      return h.response({
        status: "success",
        message: "Catatan berhasil diperbarui",
      })
        .code(200)
        .type("application/json");
    } else {
      return h.response({
        status: "fail",
        message: "Gagal memperbarui catatan. Id tidak ditemukan",
      })
        .code(404)
        .type("application/json");
    }
  },
  delete: (request, h) => {
    const { id } = request.params;

    const updateResult = NotesManager.deleteNote(id);

    if (updateResult) {
      return h.response({
        status: "success",
        message: "Catatan berhasil dihapus",
      })
        .code(200)
        .type("application/json");
    } else {
      return h.response({
        status: "fail",
        message: "Gagal mengahpus catatan. Id tidak ditemukan",
      })
        .code(404)
        .type("application/json");
    }
  }
};

module.exports = { rootHandler, NotesHanlder };
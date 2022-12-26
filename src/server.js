const Hapi = require("@hapi/hapi");
const process = require("process");
const { router } = require("./routes");
const { rootHandler, NotesHanlder } = require("./handler");

init();

async function init() {
  const server = Hapi.server({
    port: 5000,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  router.setRoute({path: "/", method: "GET", handler: rootHandler});
  router.setRoute({path: "/notes", method: "POST", handler: NotesHanlder.post});
  router.setRoute({path: "/notes/{id?}", method: "GET", handler: NotesHanlder.get});
  router.setRoute({path: "/notes/{id}", method: "PUT", handler: NotesHanlder.put});
  router.setRoute({path: "/notes/{id}", method: "DELETE", handler: NotesHanlder.delete});

  server.route(router.getRoute);
  await server.start();

  console.log("Server running at %s", server.info.uri);}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});
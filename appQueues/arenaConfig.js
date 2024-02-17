const Arena = require("bull-arena");
const { url, host, port, db } = require("./config");
const Bull = require("bull");
const queueNames = Object.values(require("./index").queueNames);

// Configure your queues for Arena
let queues = queueNames.map((val, index) => {
    return {
      name: val,
      hostId: "background_jobs",
      redis: {
        host: host,
        port: port,
        db: db,
        maxRetriesPerRequest: null,
      },
    };
  });
  
  module.exports = Arena(
    {
      Bull,
      queues: queues,
    },
    {
      basePath: "/arena",
      disableListen: true,
    },
  );
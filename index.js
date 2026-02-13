const mode = process.argv[2];

if (mode === "server") {
  require("./src/server");
} else if (mode === "client") {
  require("./src/client");
} else {
  console.log("Usage:");
  console.log("Start server: node index.js server");
  console.log("Start client: node index.js client");
}

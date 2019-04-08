const http = require("http");
const url = require("url");
const crypto = require("crypto");
const exec = require("child_process").exec;

const hostname = "localhost";
const port = 3000;

const server = http.createServer((req, res) => {
  const { repo } = url.parse(req.url, true).query;
  req.on("data", function(chunk) {
    const sig =
      "sha1=" +
      crypto
        .createHmac("sha1", process.env.SECRET)
        .update(chunk.toString())
        .digest("hex");

    if (req.headers["x-hub-signature"] == sig) {
      console.log("repo", repo);
      exec("cd " + repo + " && git pull");
    }
  });

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World!\n");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

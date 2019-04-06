const http = require("http");
const crypto = require("crypto");
const exec = require("child_process").exec;

const repo = "~/your_repo_path_here/";

http
  .createServer(function(req, res) {
    req.on("data", function(chunk) {
      console.log("process.env.SECRET", process.env.SECRET);

      const sig =
        "sha1=" +
        crypto
          .createHmac("sha1", process.env.SECRET)
          .update(chunk.toString())
          .digest("hex");

      if (req.headers["x-hub-signature"] == sig) {
        exec("cd " + repo + " && git pull");
      }
    });

    res.end();
  })
  .listen(8080);

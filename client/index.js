import http from "http";
import fs from "fs";
import checksum from "checksum";

// add a path with ENV variables
const saveDirectory = process.env.DIR || "./clientdata";
const filename = process.env.FILENAME || "fetchedfile.txt";
const port = process.env.PORT || 3000;
const url = process.env.URL || `http://localhost:${port}/download`;

function ensureDirectoryExistence(path) {
  const directory = path.substring(0, path.lastIndexOf("/"));
  if (!fs.existsSync(directory)) {
    console.log(`Directory ${path} does not exist, creating it now`);
    fs.mkdirSync(directory, { recursive: true });
  }
}

function calculateChecksum(path, sentChecksum) {
  checksum.file(path, (err, sum) => {
    if (err) throw err;
    if (sum === sentChecksum) {
      console.log("Checksums match!");
      console.log("Calculated Checksum: " + sum);
      console.log("Server's Checksum: " + sum);
      return;
    }
  });
}

async function saveFileGetChecksum(url, path) {
  const file = fs.createWriteStream(path);
  http.get(url, (response) => {
    response.pipe(file);
    const sentChecksum = response.headers["x-checksum"];
    file.on("finish", () => {
      file.close();
      console.log(`File saved to ${path}!`);
      calculateChecksum(path, sentChecksum);
    });
  });
}

// ensureDirectoryExistence(savePath);
saveFileGetChecksum(url, `${saveDirectory}/${filename}`);

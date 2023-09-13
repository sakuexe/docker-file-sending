import fs from "fs";
import checksum from "checksum";

// add a path with ENV variables
const saveDirectory = process.env.DIR || "./clientdata";
const filename = process.env.FILENAME || "fetchedfile.txt";
const port = process.env.PORT || 3000;
const server = process.env.SERVER || "/download";
const url = process.env.URL || "http://localhost";

function calculateChecksum(path, sentChecksum) {
  checksum.file(path, (err, sum) => {
    if (err) throw err;
    if (sum === sentChecksum) {
      console.log("Checksums match!");
      console.log("Calculated Checksum: " + sum);
      console.log("Server's Checksum: " + sentChecksum);
      return;
    }
    console.warn("Checksums do not match!");
    console.log("Calculated Checksum: " + sum);
    console.log("Server's Checksum: " + sentChecksum);
  });
}

async function saveFileGetChecksum(url, path) {
  const response = await fetch(url);
  const sentChecksum = response.headers.get("x-checksum");
  await fs.promises.writeFile(path, response.body);
  console.log(`File saved to ${path}!`);
  calculateChecksum(path, sentChecksum);
}

const completeURL = `${url}:${port}${server}`;
const filePath = `${saveDirectory}/${filename}`;
saveFileGetChecksum(completeURL, filePath);

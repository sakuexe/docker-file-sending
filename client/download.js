const downloadButton = document.querySelector("button");

async function downloadFile() {
  const url = "http://localhost:3000/download";
  const response = await fetch(url);
  return [response.body, response.headers.get("Checksum")];
}

downloadButton.addEventListener("click", async (event) => {
  const [fileStream, checksum] = await downloadFile();
  console.log(checksum);
});

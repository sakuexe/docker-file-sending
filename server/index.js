import express from "express";
import checksum from "checksum";
import generateFile from "./generatefile.js";

const app = express();
const port = process.env.PORT || 3000;
const filepath = process.env.SAVEPATH || "./serverdata";

app.get("/download", async (req, res) => {
  const fileName = "randomtext.txt";
  await generateFile(fileName);

  checksum.file(`${filepath}/${fileName}`, (err, sum) => {
    if (err) {
      res.status(500).send("Error generating checksum");
      return;
    }
    console.log(`Checksum for ${fileName}: ${sum}`);

    res.setHeader("x-checksum", sum);
    res.download(`${filepath}/${fileName}`);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

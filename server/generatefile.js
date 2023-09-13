import { promises as fs } from "fs";

function generateRandomText() {
  const characters = process.env.CHARACTERS || 1000;
  const letters = "abcdefghijklmnopqrstuvwxyz";
  let randomText = "";
  for (let i = 0; i <= characters; i++) {
    // get a random letter sample from the availabe letters
    // and append it to the randomText string
    randomText += letters[Math.floor(Math.random() * letters.length)];
  }
  return randomText;
}

async function saveFile(path, data) {
  try {
    await fs.writeFile(path, data);
  } catch (error) {
    console.error(error);
    return false;
  }
  return true;
}

export default async function generateFile(filename) {
  const randomText = generateRandomText();
  const filepath = process.env.SAVEPATH || "./serverdata";
  const writeSuccess = await saveFile(`${filepath}/${filename}`, randomText);
  if (!writeSuccess) {
    throw new Error("Error writing to file");
  }
}

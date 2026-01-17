import { readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { styleText } from "node:util";

const inputFilePath = resolve("./gifs.json");
const outputDirPath = resolve("./output/");

const failedUrls: string[] = [];

async function exportFavGifs() {
  const inputData = await readFile(inputFilePath, "utf-8");
  const input = JSON.parse(inputData);

  if(!Array.isArray(input))
    throw new Error("Input JSON must be an array of favorite GIF URLs.");

  await mkdir(outputDirPath, { recursive: true });

  for(const [index, url] of input.entries()) {
    const urlObj = new URL(url);
    const pathnameParts = urlObj.pathname.split("/");
    const fileName = url.trim().match(/\/mp4$/)
      ? (pathnameParts[pathnameParts.length - 2] + ".mp4").split("?")[0]
      : pathnameParts[pathnameParts.length - 1].split("?")[0];
    const outputFilePath = resolve(outputDirPath, `${index + 1}-${fileName.replace(/[^a-zA-Z0-9.\-_]/g, "_")}`);

    const response = await fetch(url);
    if(!response.ok) {
      failedUrls.push(url);
      continue;
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await writeFile(outputFilePath, buffer);
    // console.log(`Saved GIF to ${outputFilePath}`);
    
    if((index + 1) % 10 === 0) {
      const percent = Math.round((index + 1) / input.length * 100);
      console.log(`> Downloaded ${index + 1} / ${input.length} GIFs (${percent}%)...`);
    }
  }

  if(failedUrls.length > 0) {
    console.log(styleText("red", "\n>> Failed to download the following URLs:"));
    for(const failedUrl of failedUrls)
      console.log(styleText("red", `  - ${failedUrl}`));
  }

  const exportedAmt = failedUrls.length > 0 ? `${input.length - failedUrls.length} / ${input.length}` : `all ${input.length}`;

  console.log(styleText("green", `\n>> Exported ${exportedAmt} files. See folder at '${outputDirPath}'`));
}

exportFavGifs();

import { ServerFile } from "nuxt-file-storage";

export default defineEventHandler(async (event) => {
  const { files } = await readBody<{ files: ServerFile[] }>(event);

  const fileNames = [];
  for (const file of files) {
    const res = await storeFileLocally(file, 8, "/moodboard-images");

    fileNames.push(res);
  }

  return fileNames;
});

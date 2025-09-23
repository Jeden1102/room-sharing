import { put } from "@vercel/blob";

export default defineEventHandler(async (event) => {
  const files = await readMultipartFormData(event);

  if (!files) {
    throw createError({
      statusCode: 400,
      statusMessage: "No files has been found",
    });
  }

  const uris = [];
  for (const file of files) {
    const blob = await put(file.filename || "image", file.data, {
      access: "public",
      addRandomSuffix: true,
    });

    uris.push(blob.url);
  }

  return uris;
});

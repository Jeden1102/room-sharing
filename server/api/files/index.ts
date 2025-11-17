import { put } from "@vercel/blob";
import sharp from "sharp";

const IMAGE_CONFIG = {
  maxWidth: 1920,
  maxHeight: 1920,
  quality: 85,
  format: 'webp' as const,
};

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
    const isImage = file.type?.startsWith('image/');
    
    if (isImage) {
      const optimized = await sharp(file.data)
        .resize(IMAGE_CONFIG.maxWidth, IMAGE_CONFIG.maxHeight, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .webp({ quality: IMAGE_CONFIG.quality })
        .toBuffer();

      const filename = (file.filename || 'image')
        .replace(/\.(jpg|jpeg|png|gif)$/i, '.webp');

      const blob = await put(filename, optimized, {
        access: "public",
        addRandomSuffix: true,
      });

      uris.push(blob.url);
    } else {
      const blob = await put(file.filename || "file", file.data, {
        access: "public",
        addRandomSuffix: true,
      });
      uris.push(blob.url);
    }
  }

  return uris;
});
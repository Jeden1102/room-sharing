export default defineEventHandler(async (event) => {
  const { fileName, path } = await readBody<{ fileName: string; path: string }>(
    event,
  );

  try {
    await deleteFile(fileName, path);
  } catch (e) {
    console.error(e);
  }
});

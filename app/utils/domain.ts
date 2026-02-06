export const getCleanDomain = (url: string) => {
  try {
    const formattedUrl = url.startsWith("http") ? url : `https://${url}`;
    const { hostname } = new URL(formattedUrl);

    return hostname.startsWith("www.") ? hostname.slice(4) : hostname;
  } catch {
    return url;
  }
};

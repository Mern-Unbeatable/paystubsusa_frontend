export const LOGO_ACCEPT = "image/png,image/jpeg,image/webp,image/svg+xml";
const MAX_FILE_BYTES = 5 * 1024 * 1024;
const MAX_SVG_BYTES = 300 * 1024;
// Logos are stored in sessionStorage as data URLs, so raster images are downscaled.
const MAX_DIMENSION = 480;

const readAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Could not read the file."));
    reader.readAsDataURL(file);
  });

const loadImage = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("This image could not be opened."));
    img.src = src;
  });

/** Validates an uploaded logo and returns a compact data URL. */
export const readLogoFile = async (file) => {
  if (!LOGO_ACCEPT.split(",").includes(file.type)) {
    throw new Error("Please upload a PNG, JPG, WebP or SVG image.");
  }
  if (file.size > MAX_FILE_BYTES) {
    throw new Error("Logo must be 5 MB or smaller.");
  }

  if (file.type === "image/svg+xml") {
    if (file.size > MAX_SVG_BYTES) throw new Error("SVG logo must be 300 KB or smaller.");
    return readAsDataUrl(file);
  }

  const img = await loadImage(await readAsDataUrl(file));
  const scale = Math.min(1, MAX_DIMENSION / Math.max(img.naturalWidth, img.naturalHeight));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(img.naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(img.naturalHeight * scale));
  canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/png");
};

import * as path from "path";
import { fileURLToPath } from "url";

const fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(fileName);

const basePublicPath = path.join(__dirname, "..", "..", "public");
const baseHtmlPath = path.join(basePublicPath, "html");

export const getStaticFilePath = (url) => {
  let contentType = "text/html";
  let filePath = path.join(basePublicPath, url);
  const ext = path.extname(url).toLowerCase();

  if (!ext) {
    filePath = url.endsWith("/")
      ? path.join(filePath, "index.html")
      : `${filePath}.html`;
    filePath = path.join(baseHtmlPath, path.relative(basePublicPath, filePath));
  } else {
    switch (ext) {
      case ".css":
        contentType = "text/css";
        filePath = path.join(basePublicPath, "css", path.basename(url));
        break;
      case ".js":
        contentType = "text/javascript";
        filePath = path.join(basePublicPath, "javascript", path.basename(url));
        break;
      case ".jpg":
      case ".jpeg":
        contentType = "image/jpeg";
        filePath = path.join(basePublicPath, "assets", path.basename(url));
        break;
      case ".png":
        contentType = "image/png";
        filePath = path.join(basePublicPath, "assets", path.basename(url));
        break;
      default:
        contentType = "text/html";
        filePath = path.join(baseHtmlPath, path.basename(url));
        if (!filePath.endsWith(".html")) {
          filePath += ".html";
        }
    }
  }

  filePath = path.normalize(filePath);
  return { filePath, contentType };
};

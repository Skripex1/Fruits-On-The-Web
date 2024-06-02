export const staticNotFound = (res) => {
  res.writeHead(404, { "Content-Type": "text/html" });
  res.end("<h1>404: File Not Found</h1>");
};

export const routeNotFound = (res) => {
  res.writeHead(404, { "Content-Type": "text/html" });
  res.end(JSON.stringify({ message: "API Route not found" }));
};

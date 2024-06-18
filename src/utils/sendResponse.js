const sendResponse = (
  res,
  {
    data = `${res} was sent successfully!`,
    statusCode = 200,
    contentType = "application/json",
    headers = {},
  }
) => {
  const responseHeaders = {
    "Content-Type": contentType,
    ...headers,
  };

  res.writeHead(statusCode, responseHeaders);
  res.write(JSON.stringify(data));
  res.end();
};

export default sendResponse;

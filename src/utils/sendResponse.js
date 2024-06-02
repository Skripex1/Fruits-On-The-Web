const sendResponse = (
  res,
  {
    data = `${res} was sent sucessfully !`,
    statusCode = 200,
    contentType = "application/json",
  }
) => {
  res.writeHead(statusCode, { "Content-Type": contentType });
  res.write(JSON.stringify(data));
  res.end();
};

export default sendResponse;

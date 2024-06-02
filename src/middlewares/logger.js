const logger = (req, res) => {
  console.log(`${req.method} ${req.url}`);
};

export default logger;

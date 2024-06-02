const timeout = (ms) => {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Promise took to long to execute")), ms)
  );
};

const withTimeout = (promise, ms) => {
  return Promise.race([promise, timeout(ms)]);
};

export default withTimeout;

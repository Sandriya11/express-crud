const logger = (req, res, next) => {
  const now = new Date();
  const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
  const method = req.method;
  const body = (method === 'POST' || method === 'PUT') ? JSON.stringify(req.body) : '{}';

  console.log("time is:", time);
  console.log(`request method: ${method}`);
  if (method === 'POST' || method === 'PUT') {
    console.log("request body:", req.body);
  }
  console.log(`${time} info: ${method} request: ${body}`);

  next();
};

module.exports = logger;

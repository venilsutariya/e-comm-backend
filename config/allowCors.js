const allowCors = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://e-comm-web-mu.vercel.app/"); // Allow requests from any origin
  next();
};
module.exports = allowCors;

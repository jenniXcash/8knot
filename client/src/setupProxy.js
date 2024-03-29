// const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function (app) {
//   app.use(
//     createProxyMiddleware('/api1', {
//       target: 'http://localhost:8000', // API endpoint 1
//       changeOrigin: true,
//       pathRewrite: {
//         "^/api1": "",
//       },
//       headers: {
//         Connection: "keep-alive"
//       }
//     })
//   );

//   app.use(
//     createProxyMiddleware('/api2', {
//       target: 'http://localhost:4000', // API endpoint 2
//       changeOrigin: true,
//       pathRewrite: {
//         "^/api2": "",
//       },
//       headers: {
//         Connection: "keep-alive"
//       }
//     })
//   );
// }

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    createProxyMiddleware("/api/*", {
      target: "http://localhost:8000/",
      secure: false,
    })
  );
  app.use(
    createProxyMiddleware("/logAndAuth/*", {
      target: "http://localhost:4000/",
      secure: false,
    })
  );
};

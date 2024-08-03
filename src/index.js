const express = require("express");

const { ServerConfig } = require("./config");
const apiRoutes = require("./routes");
const rateLimit = require("express-rate-limit");
const {createProxyMiddleware} = require("http-proxy-middleware");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
});

app.use(limiter); //rate limiter

//reverse Proxy
app.use("/flightsService",createProxyMiddleware({target: "http://localhost:3000/",changeOrigin: true,pathRewrite: {'^/flightsService' : '/'}}));
app.use("/bookingsService",createProxyMiddleware({target: "http://localhost:4000/",changeOrigin: true,pathRewrite: {'^/bookingsService' : '/'}}));

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, () => {
  console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
});

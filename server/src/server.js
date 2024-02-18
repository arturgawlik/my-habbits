import { IncomingMessage, ServerResponse, createServer } from "node:http";
import { createReadStream } from "node:fs";
import { postHabbits } from "./habbits.js";
import { postSubscrition } from "./subscribtions.js";

const server = createServer(async (req, res) => {
  if (req.url === "/api/habbits" && req.method === "POST") {
    handlePostHabbits(req, res);
  } else if (req.url === "/api/push-subscriptions" && req.method === "POST") {
    handlePostSubscription(req, res);
  } else {
    handleFileRequest(req, res);
  }
});

/**
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 */
function handleFileRequest(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname;
  const file = getFile();
  const filePath = `../client${file}`;
  res.statusCode = 200;

  if (file.endsWith(".html")) {
    res.setHeader("Content-Type", "text/html");
  } else if (file.endsWith(".css")) {
    res.setHeader("Content-Type", "text/css");
  } else if (file.endsWith(".js")) {
    res.setHeader("Content-Type", "text/javascript");
  } else if (file.endsWith(".json")) {
    res.setHeader("Content-Type", "application/json");
  } else {
    res.statusCode = 404;
    res.end();
    return;
  }
  const readStream = createReadStream(filePath);
  readStream.on("error", () => {
    res.statusCode = 404;
    res.end();
  });
  readStream.pipe(res);

  function getFile() {
    if (path === "/") {
      return "/index.html";
    } else if (path === "/manifest.json") {
      return "/manifest.json";
    } else if (path === "/sw.js") {
      return "/sw.js";
    }
    return path;
  }
}

/**
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 */
function handlePostSubscription(req, res) {
  const userId = getUserIdentifier(req, res);
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", async () => {
    const parsedBody = JSON.parse(body);
    await postSubscrition(userId, parsedBody);
    res.statusCode = 201;
    res.end();
  });
}

/**
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 */
function handlePostHabbits(req, res) {
  const userId = getUserIdentifier(req, res);
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", async () => {
    const parsedBody = JSON.parse(body);
    await postHabbits(userId, parsedBody);
    res.statusCode = 201;
    res.end();
  });
}

/**
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 */
function getUserIdentifier(req, res) {
  const getUniqueIdentifier = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  };

  let userId = req.headers.cookie.split("=")[1];
  if (!userId) {
    userId = getUniqueIdentifier();
    res.setHeader("Set-Cookie", `identifier=${userId}`);
    return userId;
  }
  return userId;
}

/**
 * @param {number} port
 */
export function startServer(port) {
  if (!port) {
    throw new Error("port is required");
  }
  server.listen(port, () => {
    console.log("Server is running on port 3000");
  });
}

import { createServer } from "node:http";
import { getHabbits, postHabbits } from "./habbits.js";
import { postSubscrition } from "./subscribtions.js";

const server = createServer(async (req, res) => {
  if (req.url === "/api/habbits" && req.method === "POST") {
    handlePostHabbits(req, userId, res);
  } else if (req.url === "/api/habbits" && req.method === "GET") {
    await handleGetHabbits(req, res);
  } else if (req.url === "/api/push-subscriptions" && req.method === "POST") {
    handlePostSubscription(req, res);
  } else {
    res.statusCode = 404;
    res.end();
  }
});

function handlePostSubscription(req, res) {
  const userId = getUserIdentifier(req, res);
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

async function handleGetHabbits(req, res) {
  const userId = getUserIdentifier(req, res);
  res.setHeader("Content-Type", "application/json");
  const habbits = await getHabbits(userId);
  res.write(JSON.stringify(habbits));
  res.end();
}

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

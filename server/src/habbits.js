const HABBITS = {};

/**
 * @param {string} userId
 * @returns {Promise<string[]>}
 */
export async function getHabbits(userId) {
  if (!userId) {
    throw new Error("userId is required");
  }
  return copy(HABBITS[userId]) ?? [];
}

/**
 * @param {string} userId
 * @param {string[]} habbits
 */
export async function postHabbits(userId, habbits) {
  if (!userId) {
    throw new Error("userId is required");
  }
  if (!Array.isArray(habbits)) {
    throw new Error("habbits array is required");
  }
  HABBITS[userId] = copy(habbits);
}

/**
 * @returns {string[]}
 */
export function getAllHabbits() {
  return copy(HABBITS);
}

function copy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

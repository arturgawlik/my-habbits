import { database } from "./database.js";

const db = await database.get();

/**
 * @returns {Promise<object[]>}
 */
export async function getAllHabbits() {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("habbits", "readonly");
    transaction.onerror = function (error) {
      reject(error);
    };
    transaction.onabort = function (error) {
      reject(error);
    };

    const habbitsObjectStore = transaction.objectStore("habbits");
    const request = habbitsObjectStore.getAll();
    request.onsuccess = function (event) {
      resolve(event.target.result);
    };
  });
}

/**
 * @param {number} habitId
 * @returns {Promise<object>}
 */
export async function getHabbit(habitId) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("habbits", "readonly");
    transaction.onerror = function (error) {
      reject(error);
    };
    transaction.onabort = function (error) {
      reject(error);
    };

    const habbitsObjectStore = transaction.objectStore("habbits");
    const request = habbitsObjectStore.get(habitId);
    request.onsuccess = function (event) {
      resolve(event.target.result);
    };
  });
}

/**
 * @param {object} habbit
 * @returns {Promise<void>}
 */
export async function updateHabbit(habbit) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("habbits", "readwrite");
    transaction.oncomplete = function () {
      resolve();
    };
    transaction.onerror = function (error) {
      reject(error);
    };
    transaction.onabort = function (error) {
      reject(error);
    };

    const habbitsObjectStore = transaction.objectStore("habbits");
    habbitsObjectStore.put(habbit);
  });
}

/**
 * @param {object} habbit
 * @returns {Promise<void>}
 */
export async function addHabbit(habbit) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("habbits", "readwrite");
    transaction.oncomplete = function () {
      resolve();
    };
    transaction.onerror = function (error) {
      reject(error);
    };
    transaction.onabort = function (error) {
      reject(error);
    };

    const habbitsObjectStore = transaction.objectStore("habbits");
    habbitsObjectStore.add(habbit);
  });
}

/**
 * @param {number} habitId
 */
export async function removeHabbit(habitId) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("habbits", "readwrite");
    transaction.oncomplete = function () {
      resolve();
    };
    transaction.onerror = function (error) {
      reject(error);
    };
    transaction.onabort = function (error) {
      reject(error);
    };

    const habbitsObjectStore = transaction.objectStore("habbits");
    const request = habbitsObjectStore.delete(habitId);
  });
}

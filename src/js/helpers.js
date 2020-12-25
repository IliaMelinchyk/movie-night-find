import { async } from "regenerator-runtime";
import { TIMEOUT_SEC } from "./config.js";
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Слишком долгий запрос, возврат спустя ${s} секунд`));
    }, s * 1000);
  });
};
export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const movie = await res.json();
    if (!res.ok) throw new Error(`Ошибка (${res.status})`);
    return movie;
  } catch (error) {
    throw error;
  }
};

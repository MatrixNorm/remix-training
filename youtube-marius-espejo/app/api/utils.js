export function clone(jsObject) {
  // for immutability
  return JSON.parse(JSON.stringify(jsObject));
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function dbRead(data) {
  await sleep(200);
  return clone(data);
}

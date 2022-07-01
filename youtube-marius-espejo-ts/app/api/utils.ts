export function clone(jsObject: any) {
  // for immutability
  return JSON.parse(JSON.stringify(jsObject));
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function dbRead(data: any) {
  await sleep(200);
  return clone(data);
}

export function isMap(value: unknown): value is Record<string, any> {
  return value !== null && typeof value === "object";
}

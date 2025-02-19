export function validateContact(method: string, value: string): boolean {
  if (method === "email") {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }
  return /^\+?[0-9]{7,}$/.test(value);
}
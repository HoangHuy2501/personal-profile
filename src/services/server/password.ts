import "server-only";
import bcrypt from "bcryptjs";

const MAX_PASSWORD_BYTES = 72;
function validPassword(password: string) {
  return (
    typeof password === "string" &&
    password.length > 0 &&
    Buffer.byteLength(password, "utf8") <= MAX_PASSWORD_BYTES
  );
}
export async function hashPassword(password: string) {
  if (!validPassword(password))
    throw new Error("Password must be 1-72 UTF-8 bytes");
  return bcrypt.hash(password, 12);
}
export async function verifyPassword(password: string, hash: string) {
  if (!validPassword(password) || !/^\$2[aby]?\$\d{2}\$/.test(hash))
    return false;
  return bcrypt.compare(password, hash);
}

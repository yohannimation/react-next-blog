// next.js/src/data/users.ts
import bcrypt from "bcryptjs";

export let users = [
  // exemple initial
  { id: 1, username: "admin", password: bcrypt.hashSync("admin123", 10) },
];

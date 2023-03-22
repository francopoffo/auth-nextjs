import { connectToDatabase } from "../../../lib/db";
import { hashPassword } from "../../../lib/auth";

async function handler(req, res) {
  const data = req.body;

  const { email, password } = data;

  const hashedPassword = hashPassword(password);

  if (!email || !email.includes("@") || !password || password.trim() < 7) {
    res.status(422).json({ message: "Invalid input" });
    return;
  }

  const client = connectToDatabase();

  const db = client.db();

  const result = await db.collection("users").insertOne({
    email: email,
    password: hashedPassword,
  });

  res.status(201).json({ message: "User created." });
}

export default handler;

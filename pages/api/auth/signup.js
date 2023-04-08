import { connectToDatabase } from "../../../lib/db";
import { hashPassword } from "../../../lib/auth";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const { email, password } = data;

    const hashedPassword = await hashPassword(password);

    if (!email || !email.includes("@") || !password || password.trim() < 7) {
      res.status(422).json({ message: "Invalid input" });
      return;
    }

    const client = connectToDatabase();

    const db = client.db();

    const existingUser = await db.collection("users").findOne({ email: email });

    if (existingUser) {
      res.status(442).json({ message: "User already exists." });
      client.close();
      return;
    }

    const result = await db.collection("users").insertOne({
      email: email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User created." });
    client.close();
  }
}

export default handler;

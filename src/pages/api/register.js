import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Benutzername und Passwort sind erforderlich" });
    }

    try {
      const client = await MongoClient.connect(process.env.MONGODB_URI);
      const db = client.db();

      const existingUser = await db.collection("users").findOne({ username });

      if (existingUser) {
        client.close();
        return res.status(400).json({ message: "Benutzer existiert bereits" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await db.collection("users").insertOne({
        username,
        password: hashedPassword,
      });

      client.close();

      return res.status(201).json({ message: "Benutzer erfolgreich erstellt" });
    } catch (error) {
      return res.status(500).json({ message: "Es ist ein Fehler aufgetreten" });
    }
  } else {
    return res.status(405).json({ message: "Methode nicht erlaubt" });
  }
}

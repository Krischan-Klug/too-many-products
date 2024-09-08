import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    // Prüfen, ob E-Mail und Passwort vorhanden sind
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    try {
      // Verbindung zur MongoDB
      const client = await MongoClient.connect(process.env.MONGODB_URI);
      const db = client.db();

      // Prüfen, ob der Benutzer bereits existiert
      const existingUser = await db.collection("users").findOne({ email });

      if (existingUser) {
        client.close();
        return res.status(400).json({ message: "User already exists" });
      }

      // Passwort hashen
      const hashedPassword = await bcrypt.hash(password, 10);

      // Benutzer in der Datenbank speichern
      await db.collection("users").insertOne({
        email,
        password: hashedPassword,
      });

      // Verbindung schließen
      client.close();

      // Erfolgsmeldung
      return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  } else {
    // Falls keine POST-Anfrage, Rückmeldung
    return res.status(405).json({ message: "Method not allowed" });
  }
}

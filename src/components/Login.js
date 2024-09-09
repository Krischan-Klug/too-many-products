import { useState } from "react";
import { signIn } from "next-auth/react";
import { StyledProductForm } from "./StyledComponents/StyledForms";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (res.error) {
      console.error(res.error);
    } else {
      console.log("Anmeldung erfolgreich");
    }
  };

  return (
    <>
      <br />
      <br />
      <br />
      <StyledProductForm onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Benutzername"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </StyledProductForm>
    </>
  );
}

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <>
      <h1>HOME</h1>
      <p> Logged in User: {session.user.username}</p>
      <button onClick={() => signOut()}>Logout</button>
    </>
  );
}

import { useSession } from "next-auth/react";

export default function Admin() {
  const { data: session } = useSession();

  if (session.user.privileges.admin === false) {
    return (
      <div>
        <h1>NO ADMIN</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Admin</h1>
    </div>
  );
}

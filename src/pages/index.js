import { useSession } from "next-auth/react";
import LogoutButton from "@/components/utils/LogoutButton";
import { StyledBodyWrapper } from "@/components/StyledComponents/StyledWrappers";

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <StyledBodyWrapper>
        <h1>Welcome</h1>
        <p> Logged in User: {session.user.username}</p>
        <LogoutButton />
      </StyledBodyWrapper>
    </>
  );
}

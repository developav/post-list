
import { useQuery } from "@tanstack/react-query"
import { logout } from "../../api/User";
import { Loader } from "../Loader";
import { queryClient } from "../../api/queryClient";
import "./LogoutButton.css";
import { AuthForm } from "../AuthForm";
import { NoteForm } from "../NoteForm";


export const LogoutButton = () => {
const meQuery = useQuery({
    queryFn: () => logout(),
    queryKey: ["users","me"],
    retry: 0,
}, queryClient
);
switch(meQuery.status) {
  case "pending":
      return <Loader/>
  case "error": 
      return <NoteForm/>
  case "success": 
      return <AuthForm/>
}
}

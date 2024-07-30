import { useQuery } from "@tanstack/react-query"
import { fetchMe } from "../../api/User"
import { Loader } from "../Loader";
import { AuthForm } from "../AuthForm";
import { queryClient } from "../../api/queryClient";
import { NoteForm } from "../NoteForm";
import { FetchNoteListView } from "../NotesListView/fetchNoteListView";


export const Account = () => {
    const meQuery = useQuery({
        queryFn: () => fetchMe(),
        queryKey: ["users", "me"],
        retry: 0
    }, queryClient
    );

    switch(meQuery.status) {
        case "pending":
            return <Loader />;
        case "error": 
            return <AuthForm />;
        case "success": 
            return (
                <>
                    <NoteForm />    
                    <FetchNoteListView /> 
                </>
              );
            
    }
}
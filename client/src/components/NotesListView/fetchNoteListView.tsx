import { useQuery } from "@tanstack/react-query";
import { fetchNoteList } from "../../api/Notes"
import { Loader } from "../Loader";
import { NotesListView } from "./NotesListView";
import { queryClient } from "../../api/queryClient";

export const FetchNoteListView = () => {

    const noteListQuery = useQuery({
        queryFn: () => fetchNoteList(),
        queryKey: ["notes"],
    }, 
    queryClient);
        switch(noteListQuery.status){
        case "pending":
            return <Loader />;

        case "success":
            return <NotesListView noteList={noteListQuery.data.list} />;
            
        case "error":
            return (
                <div>
                    <span>Произошла ошибка :(</span>
                    <button onClick={ () => noteListQuery.refetch()}>Повторить запрос</button>
                </div>
            );
    }
};
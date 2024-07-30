import { useEffect, useState } from 'react';
import { z } from 'zod';
import { validateResponse } from "./validateResponse";

export const NoteSchema = z.object({
    id: z.string(),
    title: z.string(),
    text: z.string(),
    userId: z.string(),
    createdAt: z.number(),
})

export type Note = z.infer<typeof NoteSchema>

export const NoteList = z.array(NoteSchema)

export type NoteList = z.infer<typeof NoteList>

export const fetchNoteListSchema = z.object({
    list: NoteList,
})

export type fetchNoteListResponse = z.infer<typeof fetchNoteListSchema>


export function fetchNoteList(): Promise<fetchNoteListResponse> {
    return fetch("api/notes")
    .then((response) => response.json())
    .then((data)=> fetchNoteListSchema.parse(data))
}

interface IdleRequestState {
    status: "idle";
}
interface LoadingRequestState {
    status: "pending";
}

interface SuccessRequestState {
    status: "success";
    data: NoteList;
}

interface ErrorRequestsState {
    status: "error";
    error: unknown;
}

type RequestState = 
| IdleRequestState 
| LoadingRequestState 
| SuccessRequestState 
| ErrorRequestsState;

export function usePostList() {
    const [state, setState] = useState<RequestState>({
        status:"idle",
    });
   
    useEffect(() => {
        if(state.status === "pending") {
            console.log(state.status)
            fetchNoteList()
            
            .then((data) => {
                setState({ status: "success", data: data.list });
                console.log(state.status)
            })
            .catch((error)=>{
                setState({ status: "error", error: error })
                console.log(state.status)
            });
        }
    }, [state]);

    useEffect(() => {
        setState({ status: "pending" });
      }, []);
 
      const refetch = () => {
        setState({ status: "pending" });
      };

    return {
        state,
        refetch,
    }
}

export function createNote(formData:string): Promise<void> {
    return fetch("/api/notes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: formData,
    })
    
    .then(validateResponse)
    .then(() => undefined);
}
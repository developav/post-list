import { FC } from "react";
import { Note } from "../../api/Notes";
import { LogoutButton } from "../LogoutButton";
import "./NoteView.css";

import { FetchUserView } from "../UserView";

const formatDate = (timestamp: number):string => {
  const date = new Date(timestamp);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString(undefined, {
    timeStyle: 'medium',
  })}`;
};

interface NoteViewProps {
  note: Note
}

export const NoteView: FC <NoteViewProps> = ({ note }) => {
  return (
    <div className="note-view">
      <LogoutButton/>
      <FetchUserView userId={note.userId}/>
      <div className="note-view__head">
        <p className="note-view__datetime">{formatDate(note.createdAt)}</p>
        <p className="note-view__title">{ note.text }</p>
      </div>
      <p className="note-view__text">{note.title}</p>
    </div>
  );
};

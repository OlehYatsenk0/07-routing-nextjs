import css from "./NotePreview.module.css";
import type { Note } from "@/types/note";

interface NotePreviewProps {
  note: Note;
}

export default function NotePreview({ note }: NotePreviewProps) {
  if (!note) {
    return <p className={css.error}>Note not found.</p>;
  }

  return (
    <div className={css.container}>
      <h2 className={css.title}>{note.title}</h2>

      {note.tags && note.tags.length > 0 && (
        <ul className={css.tagsList}>
          {note.tags.map((tag) => (
            <li key={tag} className={css.tagItem}>
              {tag}
            </li>
          ))}
        </ul>
      )}

      <p className={css.content}>{note.content}</p>

      <div className={css.footer}>
        <p className={css.date}>
          Created: {new Date(note.createdAt).toLocaleString()}
        </p>
        {note.updatedAt && (
          <p className={css.date}>
            Updated: {new Date(note.updatedAt).toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
}
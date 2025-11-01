"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { useRouter } from "next/navigation";
import css from "./NotePreview.module.css";

export default function NotePreviewClient({ id }: { id: string }) {
  const router = useRouter();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <div className={css.loader}>Loading...</div>;
  if (isError || !data) return <div className={css.error}>Note not found</div>;

  return (
    <div className={css.modalOverlay} onClick={() => router.back()}>
      <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2 className={css.title}>{data.title}</h2>
        <p className={css.content}>{data.content}</p>

        {data.tags && data.tags.length > 0 && (
          <div className={css.tags}>
            {data.tags.map((tag: string) => (
              <span key={tag} className={css.tag}>
                {tag}
              </span>
            ))}
          </div>
        )}

        <button
          className={css.closeButton}
          onClick={() => router.back()}
          aria-label="Close"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
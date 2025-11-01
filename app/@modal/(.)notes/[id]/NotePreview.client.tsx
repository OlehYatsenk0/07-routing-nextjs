"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import type { Note } from "@/types/note";
import Modal from "@/components/Modal/Modal";
import NotePreview from "@/components/NotePreview/NotePreview";

export default function NotePreviewClient({ id }: { id: string }) {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <Modal open onClose={() => router.back()}>
      {isLoading ? (
        <p style={{ padding: 16 }}>Loading, please wait...</p>
      ) : isError || !data ? (
        <p style={{ padding: 16, color: "#b91c1c" }}>Failed to load note.</p>
      ) : (
        <NotePreview note={data} onBack={() => router.back()} />
      )}
    </Modal>
  );
}
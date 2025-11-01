import { fetchNoteById } from "@/lib/api";
import NotePreviewModalClient from "./NotePreviewModal.client";

export default async function NotePreviewModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const note = await fetchNoteById(id);

  return <NotePreviewModalClient note={note} />;
}
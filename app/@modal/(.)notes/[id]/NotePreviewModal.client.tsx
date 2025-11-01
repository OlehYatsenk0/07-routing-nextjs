"use client";

import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import NotePreview from "@/components/NotePreview/NotePreview";
import type { Note } from "@/types/note";

export default function NotePreviewModalClient({ note }: { note: Note }) {
  const router = useRouter();

  return (
    <Modal isOpen={true} onClose={() => router.back()}>
      <NotePreview note={note} />
    </Modal>
  );
}
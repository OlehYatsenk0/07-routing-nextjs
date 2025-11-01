import NoteModalClient from "./NoteModal.client";

export default async function NoteModalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; 
  return <NoteModalClient id={id} />;
}
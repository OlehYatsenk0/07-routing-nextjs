"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import CreateNote from "@/components/CreateNote/CreateNote";
import css from "./Notes.module.css";

export default function NotesClient({ tag }: { tag?: string }) {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") ?? 1);
  const search = searchParams.get("search") ?? "";

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["notes", { page, search, tag }],
    queryFn: () => fetchNotes({ page, search, tag }),
  });

  if (isLoading) return <p>Loading notes...</p>;
  if (isError) return <p>Error loading notes.</p>;
  if (!data?.notes?.length) return <p>No notes found.</p>;

  return (
    <div className={css.wrapper}>
      <div className={css.topRow}>
        <SearchBox />
        <CreateNote />
      </div>
      <NoteList notes={data.notes} />
      <Pagination totalPages={data.totalPages} />
    </div>
  );
}
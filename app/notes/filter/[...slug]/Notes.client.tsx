"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import CreateNote from "@/components/CreateNote/CreateNote";
import css from "./Notes.module.css";

export default function NotesClient({ tag }: { tag?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  
  const page = Number(searchParams.get("page") ?? 1);
  const search = searchParams.get("search") ?? "";

  
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(newPage));
    router.push(`?${params.toString()}`);
  };

  
  const handleSearch = (query: string) => {
    const params = new URLSearchParams(searchParams);
    if (query) params.set("search", query);
    else params.delete("search");
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  
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
        <SearchBox onSearch={handleSearch} />
        <CreateNote />
      </div>

      <NoteList notes={data.notes} />

     
      <Pagination
        totalPages={data.totalPages}
        currentPage={page}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
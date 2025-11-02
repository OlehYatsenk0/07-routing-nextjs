import axios, { AxiosInstance } from "axios";
import type { Note, CreateNoteDto } from "@/types/note";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://notehub-public.goit.study/api";
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const instance: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});


export interface PaginatedNotesResponse {
  notes: Note[];
  totalPages: number;
}


export interface NotesQueryParams {
  q?: string;
  page?: number;
  tag?: string; 
}


export type CreateNotePayload = CreateNoteDto;


export async function fetchNotes(
  params: NotesQueryParams = {}
): Promise<PaginatedNotesResponse> {
  const { q, page = 1, tag } = params;

  const queryParams = new URLSearchParams();
  queryParams.set("page", String(page));
  queryParams.set("perPage", "8");
  if (q?.trim()) queryParams.set("search", q.trim());
  if (tag && tag !== "all") {
  const capitalizedTag = tag.charAt(0).toUpperCase() + tag.slice(1);
  queryParams.set("tag", capitalizedTag);
}

  const { data } = await instance.get(`/notes?${queryParams.toString()}`);
  return data;
}


export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await instance.get(`/notes/${id}`);
  return data;
}


export async function createNote(payload: CreateNotePayload): Promise<Note> {
  const { data } = await instance.post("/notes", payload);
  return data;
}


export async function deleteNote(id: string): Promise<Note> {
  const { data } = await instance.delete<Note>(`/notes/${id}`);
  return data;
}
import axios, { AxiosInstance } from "axios";
import type { Note, CreateNoteDto } from "@/types/note";
import type { FetchNotesParams, NotesListResponse } from "@/types/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://notehub-public.goit.study/api";
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const instance: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});


export interface FetchNotesParams {
  page: number;
  search: string;
  perPage?: number;
  tag?: string; 
}

export interface NotesListResponse {
  notes: Note[];
  totalPages: number;
}




export async function fetchNotes({
  page,
  search,
  perPage = 8,
  tag,
}: FetchNotesParams): Promise<NotesListResponse> {
  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("perPage", String(perPage));
  if (search.trim()) params.set("search", search.trim());
  if (tag && tag !== "all") params.set("tag", tag); 

  const { data } = await instance.get(`/notes?${params.toString()}`);
  return data;
}


export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await instance.get(`/notes/${id}`);
  return data;
}


export async function createNote(dto: CreateNoteDto): Promise<Note> {
  const { data } = await instance.post("/notes", dto);
  return data;
}


export async function deleteNote(id: string): Promise<void> {
  await instance.delete(`/notes/${id}`);
}
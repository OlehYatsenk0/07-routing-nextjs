"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import css from "./CreateNote.module.css";

export default function CreateNote() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("Todo");

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setTitle("");
      setContent("");
      setTag("Todo");
      setOpen(false);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    mutate({ title, content, tag });
  };

  if (!open)
    return (
      <button className={css.openButton} onClick={() => setOpen(true)}>
        Create note
      </button>
    );

  return (
    <div className={css.overlay} onClick={() => setOpen(false)}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <h2>Create a new note</h2>

        <form onSubmit={handleSubmit} className={css.form}>
          <input
            className={css.input}
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className={css.textarea}
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <select
            className={css.select}
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </select>

          <div className={css.actions}>
            <button type="submit" disabled={isPending} className={css.submitBtn}>
              {isPending ? "Saving…" : "Save"}
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className={css.cancelBtn}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
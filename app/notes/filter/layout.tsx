import type { ReactNode } from "react";
import layoutCss from "./LayoutNotes.module.css";

export default function NotesFilterLayout({
  sidebar,
  children,
}: {
  sidebar: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className={layoutCss.container}>
      <aside className={layoutCss.sidebar}>{sidebar}</aside>
      <section className={layoutCss.notesWrapper}>{children}</section>
    </div>
  );
}
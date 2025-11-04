import Link from "next/link";
import TagsMenu from "@/components/TagsMenu/TagsMenu";
import css from "./Header.module.css";

export default function Header() {
  return (
    <header className={css.header}>
      {/* Логотип веде на головну */}
      <Link href="/" aria-label="Home" className={css.headerLink}>
        NoteHub
      </Link>

      {/* Основна навігація */}
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li className={css.navigationItem}>
            <Link href="/" className={css.navigationLink}>
              Home
            </Link>
          </li>

          {/* Пряме посилання або меню для /notes/filter/all */}
          <li className={css.navigationItem}>
            <TagsMenu />
          </li>
        </ul>
      </nav>
    </header>
  );
}

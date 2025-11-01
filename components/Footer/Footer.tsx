'use client';

import css from './Footer.module.css';

export function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Yatsenko Oleh</p>
          <p>
            Contact us:{' '}
            <a href="mailto:yatsenko.prog@gmail.com">yatsenko.prog@gmail.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
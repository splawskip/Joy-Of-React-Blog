'use client';

import React, { useState } from 'react';
import clsx from 'clsx';
import { Rss, Sun, Moon } from 'react-feather';

import Logo from '@/components/Logo';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './Header.module.css';
import Cookies from 'js-cookie';
import { DARK_TOKENS, LIGHT_TOKENS } from '@/constants';

function Header({ initialTheme, className, ...delegated }) {
const [theme, setTheme] = useState(initialTheme);
function handleToggleTheme() {
	const nextTheme = theme === 'light' ? 'dark' : 'light';
	setTheme(nextTheme);

	Cookies.set('color-theme', nextTheme, {
		expires: 1000,
	});

	const newTokens = nextTheme === 'light' ? LIGHT_TOKENS : DARK_TOKENS;
	const root = document.documentElement;

	root.setAttribute('data-color-theme', nextTheme);
	Object.entries(newTokens).forEach((
		[key, value]
	) => {
		root.style.setProperty(key, value);
	});
}
  return (
    <header
      className={clsx(styles.wrapper, className)}
      {...delegated}
    >
      <Logo />

      <div className={styles.actions}>
        <a className={styles.action} href='/rss.xml'>
          <Rss
            size="1.5rem"
            style={{
              // Optical alignment
              transform: 'translate(2px, -2px)',
            }}
          />
          <VisuallyHidden>
            View RSS feed
          </VisuallyHidden>
        </a>
        <button className={styles.action} onClick={handleToggleTheme}>
			{theme === 'light' ? (
				<Sun size="1.5rem" />
			) : (
				<Moon size="1.5rem" />
			)}
          <VisuallyHidden>
            Toggle dark / light mode
          </VisuallyHidden>
        </button>
      </div>
    </header>
  );
}

export default Header;

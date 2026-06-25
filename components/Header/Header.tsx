'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import css from './Header.module.css';
import AuthNavigation from '@/components/AuthNavigation/AuthNavigation';
import Loading from '@/app/loading';

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      setIsNavigating(false);
    }
  }, [pathname]);

  const handleNavClick = () => {
    closeMenu();
    setIsNavigating(true);
  };

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  const burgerIcon = isMenuOpen ? '/sprite.svg#close' : '/sprite.svg#burger';

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        closeMenu();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      {isNavigating && <Loading />}
      <header className={css.header}>
        <Link href="/" aria-label="Home" className={css.headerLink} onClick={handleNavClick}>
          <Image
            src="/logo.svg"
            alt="Tasteorama"
            className={css.logoIcon}
            width={165}
            height={46}
            priority
          />
        </Link>

        <button
          className={css.burgerButton}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <svg className={css.iconBurger} width={32} height={32}>
            <use href={burgerIcon} />
          </svg>
        </button>

        <nav aria-label="Main Navigation" className={`${css.nav} ${isMenuOpen ? css.navOpen : ''}`}>
          <ul className={css.navigation}>
            <li className={css.navigationItem}>
              <Link
                onClick={handleNavClick}
                href="/"
                className={`${css.navigationLink} ${pathname === '/' ? css.activeLink : ''}`}
              >
                Recipes
              </Link>
            </li>

            <AuthNavigation onLinkClick={handleNavClick} />
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;

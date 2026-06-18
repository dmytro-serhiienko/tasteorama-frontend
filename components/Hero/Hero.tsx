"use client"
// Імпорт компонента Link з Next.js - Для створення посилань
// import Link from 'next/link';

// Імпорт стилів з модуля стилів
import css from './Hero.module.css';

// import SearchBox from '../SearchBox/SearchBox';

// Імпорт компонента AuthNavigation
// import AuthNavigation from '@/components/AuthNavigation/AuthNavigation';

import SearchBox from '../SearchBox/SearchBox';
import { useSearchParams } from 'next/navigation';

const Hero = () => {
  const searchParams = useSearchParams()
  return (
    <section className={css.hero}>
      <div className={css.content}>
        <h1 className={css.title}>
          Plan, Cook, and
          <br />
          Share Your Flavors
        </h1>

        <SearchBox key={searchParams.get("search") ?? ""} />
      </div>
    </section>
  );
};

export default Hero;

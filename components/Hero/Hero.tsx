// Імпорт компонента Link з Next.js - Для створення посилань
// import Link from 'next/link';

// Імпорт стилів з модуля стилів
import css from './Hero.module.css';

// import SearchBox from '../SearchBox/SearchBox';

// Імпорт компонента AuthNavigation
// import AuthNavigation from '@/components/AuthNavigation/AuthNavigation';

import SearchBox from '../SearchBox/SearchBox';

const Hero = () => {
  return (
    <section className={css.hero}>
<<<<<<< HEAD
      <div className={css.content}>
        <h1 className={css.title}>Plan, Cook, and Share Your Flavors</h1>

        <SearchBox />
      </div>
=======
      <h3 className={css.hero}>Hero</h3>
      {/* <SearchBox /> */}
>>>>>>> main
    </section>
  );
};

export default Hero;

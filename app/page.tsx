// ==========================================================================================
// / – головна сторінка з загальною інформацією про застосунок.
// ==========================================================================================
// import Image from 'next/image';
// ------------------------------------------------------------------------------------------

// Імпорт модуля зі стилями компонента

import css from './MainPage.module.css';

// Імпорт компонентів
// import SearchBox from '@/components/SearchBox/SearchBox';
import Filters from '@/components/Filters/Filters';
import RecipesList from '@/components/RecipesList/RecipesList';
import RecipeCard from '@/components/RecipeCard/RecipeCard';
import LoadMoreBtn from '@/components/LoadMoreBtn/LoadMoreBtn';

import MyTest from '@/components/MyTest/MyTest';
import HeaderMy from '@/components/HeaderMy/HeaderMy';

function MainPage() {
  return (
    <main className={css.container}>
      <h1 className={css.title}>Tasteorama</h1>
      {/* <SearchBox /> */}
      <HeaderMy />
      <Filters />
      <RecipesList />
      <RecipeCard />
      <LoadMoreBtn />
      <MyTest />
    </main>
  );
}

export default MainPage;

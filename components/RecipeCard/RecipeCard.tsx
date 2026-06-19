'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { useAuthStore } from '@/lib/store/authStore';
import SaveRecipeNotAuthorized from '@/components/SaveRecipeNotAuthorized/SaveRecipeNotAuthorized';

import { useFavorite } from './useFavorite';
import css from './RecipeCard.module.css';

import type { Recipe } from '@/types/recipe';

type RecipeCardProps = {
  recipe: Recipe;
  initialIsFavorite?: boolean;
};

const RecipeCard = ({ recipe, initialIsFavorite = false }: RecipeCardProps) => {
  const { _id, title, thumb, time, description, calories } = recipe;

  const [showAuthModal, setShowAuthModal] = useState(false);

  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  const { isFavorite, isLoading, toggleFavorite } = useFavorite({
    recipeId: _id,
    initialIsFavorite,
  });

  const handleFavoriteClick = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    toggleFavorite();
  };

  return (
    <>
      <article className={css.card}>
        {/* Тимчасово img, поки не додали домен для next/image */}
        <img src={thumb} alt={title} loading="lazy" className={css.img} />

        <div className={css.header}>
          <h3 className={css.title}>{title}</h3>

          <span className={css.timeBox}>
            <svg className={css.clockIcon} aria-hidden="true">
              <use href="/sprite.svg#clock" />
            </svg>

            <span className={css.time}>{time ? `${time} min` : '—'}</span>
          </span>
        </div>

        <div className={css.desBox}>
          <p>{description}</p>
        </div>

        <div className={css.btnBox}>
          <Link href={`/recipes/${_id}`} className={css.moreBtn}>
            Learn more
          </Link>

          <button
            type="button"
            onClick={handleFavoriteClick}
            disabled={isLoading}
            className={`${css.saveBtn} ${isFavorite ? css.active : ''}`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Save recipe'}
          >
            {isLoading ? (
              <span className={css.loader} aria-hidden="true" />
            ) : (
              <svg className={css.saveIcon} aria-hidden="true">
                <use href="/sprite.svg#save" />
              </svg>
            )}
          </button>
        </div>
      </article>

      {showAuthModal && <SaveRecipeNotAuthorized onClose={() => setShowAuthModal(false)} />}
    </>
  );
};

export default RecipeCard;

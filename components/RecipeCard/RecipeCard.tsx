'use client';

import Link from 'next/link';
import css from './RecipeCard.module.css';
import type { Recipe } from '@/types/recipe';

type RecipeCardProps = {
  recipe: Recipe;
  isFavorite?: boolean;
  onToggleFavorite?: (recipeId: string) => void;
  onDelete?: (recipeId: string) => void;
  variant?: 'favorite' | 'trash' | 'none'; // 'favorite' (сохранить), 'trash' (удалить), 'none' (без кнопки)
};

const RecipeCard = ({
  recipe,
  isFavorite = false,
  onToggleFavorite,
  onDelete,
  variant = 'favorite',
}: RecipeCardProps) => {
  const { _id, title, thumb, time, description } = recipe;

  return (
    <div className={css.card}>
      <img src={thumb} alt={title} loading="lazy" className={css.img} />

      <div className={css.header}>
        <h3 className={css.title}>{title}</h3>

        <div className={css.timeBox}>
          {/* Иконка часов */}
          <svg width={14} height={14} className={css.iconClock}>
            <use href="/sprite.svg#clock" />
          </svg>
          <p className={css.time}>{time ? `${time}` : '—'}</p>
        </div>
      </div>

      <div className={css.desBox}>
        <p className={css.des}>{description}</p>
      </div>

      <div className={css.btnBox}>
        <Link
          href={`/recipes/${_id}`}
          className={`${css.moreBtn} ${variant === 'none' ? css.moreBtnFull : ''}`}
        >
          Learn more
        </Link>

        {/* Состояние 1 и 2: Кнопка сохранения рецепта */}
        {variant === 'favorite' && onToggleFavorite && (
          <button
            type="button"
            onClick={() => onToggleFavorite(_id)}
            className={`${css.saveBtn} ${isFavorite ? css.active : ''}`}
            aria-label={isFavorite ? 'Remove from saved' : 'Save recipe'}
          >
            <svg width={20} height={20} className={css.iconAction}>
              {/* ID строго совпадает со спрайтом: #save */}
              <use href="/sprite.svg#save" />
            </svg>
          </button>
        )}

        {/* Состояние 3: Кнопка удаления рецепта */}
        {variant === 'trash' && onDelete && (
          <button
            type="button"
            onClick={() => onDelete(_id)}
            className={css.removeBtn}
            aria-label="Delete recipe"
          >
            <svg width={20} height={20} className={css.iconAction}>
              {/* ID строго совпадает со спрайтом: #trash */}
              <use href="/sprite.svg#trash" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;

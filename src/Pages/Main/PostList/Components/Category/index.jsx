import cls from '../../PotsList.module.scss';

export const Category = ({
  setSelectedCategory,
  setCurrentPage,
  categories,
  selectedCategory,
}) => {
  const selectCategory = category => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };
  return (
    <div className={cls.postCategory}>
      <button
        onClick={() => selectCategory(null)}
        className={`${
          selectedCategory === null
            ? 'bg-[var(--color-text-base)] text-[var(--color-text)]'
            : ''
        }`}
      >
        Все
      </button>
      {categories
        .map(category => (
          <button
            key={category}
            onClick={() => selectCategory(category)}
            className={`${
              selectedCategory === category
                ? 'bg-[var(--color-text-base)] text-[var(--color-text)]'
                : ''
            }`}
          >
            {category}
          </button>
        ))
        .reverse()}
    </div>
  );
};

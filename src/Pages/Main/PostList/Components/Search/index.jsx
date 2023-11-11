import cls from '../../PotsList.module.scss';

export const Search = ({ searchText, setSearchText, setCurrentPage }) => {
  const handleSearch = event => {
    setSearchText(event.target.value);
    setCurrentPage(1);
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Поиск..."
        value={searchText}
        onChange={handleSearch}
        className={cls.Search}
      />
    </div>
  );
};

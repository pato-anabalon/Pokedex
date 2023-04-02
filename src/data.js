import data from './data/pokemon/pokemon.js';

export const fetchData = () => {
  return data.pokemon;
};

export const search = (name) => {
  const dataFilter = data.pokemon.filter((pokemonItem) => {
    const pokemonData = pokemonItem.num + pokemonItem.name.toUpperCase();
    return pokemonData.search(name.toUpperCase()) !== -1 ? true : false;
  });

  return dataFilter;
};

export const sort = (sortActivate) => {
  const sortData = [...data.pokemon];
  const dataFilter = !sortActivate
    ? sortData.sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0))
    : sortData;

  return dataFilter;
};

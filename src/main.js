import { fetchData, search, sort } from './data.js';

let initialDataLoaded = false;
let sortActivate = false;
const loader = document.querySelector('.loader');
const toggle = document.getElementById('toggle');
const mainSection = document.getElementById('mainSection');
const templatePokecard = document.getElementById('templatePokecard');
const headerInput = document.getElementById('headerInput');
const headerSortButton = document.getElementById('headerSortButton');

toggle.addEventListener('click', menuToggle);
window.addEventListener('DOMContentLoaded', initialLoad);
window.addEventListener('load', hiddenLoader);
headerInput.addEventListener('keyup', searchPokemon);
headerSortButton.addEventListener('click', sortPokemon);

function initialLoad() {
  menuToggle();
  loadInitialData();
}

function hiddenLoader() {
  loader.style.opacity = 0;
  loader.style.visibility = 'hidden';
}

function menuToggle() {
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('toggle');
  nav.classList.toggle('active');
  toggle.classList.toggle('active');
}

function loadInitialData() {
  const data = fetchData();

  if (!initialDataLoaded) {
    initialDataLoaded = true;
    renderData(data);
  } else {
    return null;
  }
}

function renderData(data) {
  const fragment = new DocumentFragment();
  const card = templatePokecard.content;

  mainSection.innerHTML = '';

  if (data.length === 0) {
  }

  data.forEach((pokemon) => {
    card.querySelector('.pokecard').dataset.id = Number(pokemon.num);
    card.querySelector('.pokecard__number').textContent = `#${pokemon.num}`;
    card.querySelector('.pokecard__name').textContent =
      pokemon.name.toUpperCase();
    card.querySelector('img').setAttribute('src', pokemon.img);

    const clone = card.cloneNode(true);
    fragment.appendChild(clone);
  });

  mainSection.appendChild(fragment);
}

function searchPokemon(e) {
  if (e.target.value.length === 0) loadInitialData();

  initialDataLoaded = false;
  const data = search(e.target.value);
  renderData(data);
}

function sortPokemon() {
  const data = sort(sortActivate);
  sortActivate = !sortActivate;
  renderData(data);
}

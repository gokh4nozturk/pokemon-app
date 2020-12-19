import React, { useEffect, useState, useCallback } from 'react';
import Axios from 'axios';
import { useTitle } from 'react-use';
import Pokemon from '../components/pokemon';
import Layout from '../components/layout';

import './style/pokemonsStyles.less';

const POKEMON_INITIAL_URL = 'https://pokeapi.co/api/v2/pokemon/';
const LIKED_POKEMON_STORAGE_KEY = 'liked-pokemons';

const Pokemons = () => {
  const [pokemons, setPokemons] = useState([]);
  const [prev, setPrev] = useState('');
  const [next, setNext] = useState('');

  const [likedPokemons, setLikedPokemons] = useState(() => {
    const initialData = localStorage.getItem(LIKED_POKEMON_STORAGE_KEY);
    const data = JSON.parse(initialData);
    return data ?? [];
  });

  useTitle('Pokemon App');

  const fetchPokemons = useCallback(async (url = POKEMON_INITIAL_URL) => {
    const data = await Axios.get(`${url}`).then((res) => res.data);

    setPrev(data.previous);
    setNext(data.next);
    setPokemons(data.results);
  }, []);

  const onFavorite = (pokemonId) => {
    setLikedPokemons([...likedPokemons, pokemonId]);
  };

  const onUnfavorite = (pokemonId) => {
    setLikedPokemons(likedPokemons.filter((pokemon) => pokemon !== pokemonId));
  };

  useEffect(() => {
    localStorage.setItem(
      LIKED_POKEMON_STORAGE_KEY,
      JSON.stringify(likedPokemons)
    );
  }, [likedPokemons]);

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <Layout>
      <div className="pokemons-container">
        {pokemons.map((pokemon) => {
          const pokemonId = pokemon.url.split('/').slice(-2, -1)[0] ?? '';
          return (
            <Pokemon
              key={pokemonId}
              {...pokemon}
              onFavorite={onFavorite}
              onUnfavorite={onUnfavorite}
              isFavorite={likedPokemons.includes(pokemonId)}
            />
          );
        })}
      </div>
      <div className="pagination">
        <div>
          <button
            onClick={() => {
              fetchPokemons(prev);
            }}
          >
            Previous
          </button>
          <button
            onClick={() => {
              fetchPokemons(next);
            }}
          >
            Next
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Pokemons;

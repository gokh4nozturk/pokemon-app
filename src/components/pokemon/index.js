import Axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './pokemonStyle.less';

const Pokemon = ({ url, name, onFavorite, onUnfavorite, isFavorite }) => {
  const [pokeImg, setPokeImg] = useState();

  const id = url.split('/').slice(-2, -1)[0] ?? '';

  const fetchPoke = useCallback(async () => {
    const data = await Axios.get(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    ).then((res) => res.data);

    setPokeImg(data.sprites.front_default);
  }, [id]);

  useEffect(() => {
    fetchPoke();
  }, []);

  return (
    <div className="pokemon-card">
      <Link to={`/${id}`}>
        <div>
          <figure>{pokeImg && <img src={pokeImg} alt={name} />}</figure>
        </div>
        <div>
          <p> {name} </p>
        </div>
      </Link>
      <div>
        {!isFavorite ? (
          <button
            className="add-favorite"
            onClick={() => {
              onFavorite(id);
            }}
          >
            Add Favorite
          </button>
        ) : (
          <button
            className="remove-favorite"
            onClick={() => {
              onUnfavorite(id);
            }}
          >
            Remove Favorite
          </button>
        )}
      </div>
    </div>
  );
};

export default Pokemon;

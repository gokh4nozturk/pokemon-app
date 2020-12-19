import Axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './pokemonStyle.less';

const Pokemon = ({ url, name }) => {
  const [pokeImg, setPokeImg] = useState([]);
  const id = url.split('/').slice(-2, -1);

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
      <Link className="link" to={`/${id}`}>
        <div>
          <figure>
            <img src={pokeImg} alt={name} />
          </figure>
        </div>
        <div>
          <p> {name} </p>
        </div>
      </Link>
    </div>
  );
};

export default Pokemon;

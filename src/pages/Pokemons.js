import React, { useEffect, useState, useCallback } from 'react';
import Axios from 'axios';
import Pokemon from '../components/pokemon';
import Layout from '../components/layout';
import { useTitle } from 'react-use';
import uniqid from 'uniqid';

import './style/pokemonsStyles.less';

const Pokemons = () => {
  const [pokemons, setPokemons] = useState([]);
  const [prev, setPrev] = useState('');
  const [next, setNext] = useState('');
  const [baseUrl, setBaseUrl] = useState('https://pokeapi.co/api/v2/pokemon/');

  useTitle('Pokemon App');

  const fetchPokemons = useCallback(async () => {
    const data = await Axios.get(`${baseUrl}`).then((res) => res.data);

    setPrev(data.previous);
    setNext(data.next);
    setPokemons(data.results);
  }, [baseUrl]);

  const changeUrl = (url) => {
    if (url !== null) setBaseUrl(url);
  };

  useEffect(() => {
    fetchPokemons();
  }, [fetchPokemons]);
  return (
    <Layout>
      <div className="pokemons-container">
        {pokemons.map((pokemon) => {
          return <Pokemon key={uniqid()} {...pokemon} />;
        })}
      </div>
      <div className="pagination">
        <div>
          <button
            className="btn-prev page-buttons"
            onClick={() => {
              changeUrl(prev);
            }}
          >
            Previous
          </button>
          <button
            className="btn-next page-buttons"
            onClick={() => {
              changeUrl(next);
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

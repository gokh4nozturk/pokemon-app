import Axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Moves from '../components/moves';
import Layout from '../components/layout';
import { useTitle } from 'react-use';

import './style/detailStyles.less';

const PokemonDetail = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState([]);
  const [pokeImg, setPokeImg] = useState([]);
  const [pokeMoves, setPokeMoves] = useState([]);
  const [pokeWeight, setPokeWeight] = useState('');
  const [pokeHeight, setPokeHeight] = useState('');
  const [pokeName, setPokeName] = useState('');

  useTitle(pokeName.toUpperCase());

  const fetchPokeDetail = useCallback(async () => {
    const data = await Axios.get(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    ).then((res) => res.data);
    setPokeName(data.name);
    setPokeHeight(data.height);
    setPokeWeight(data.weight);
    setPokeMoves(data.moves);
    setPokeImg(data.sprites.front_default);
    setDetail(data);
  }, [id]);

  useEffect(() => {
    fetchPokeDetail();
  }, []);

  return (
    <Layout>
      <div className="detail-container">
        <div className="detail-poke">
          <div className="detail-img">
            <img src={pokeImg} alt={detail.name} />
          </div>
          <div className="detail-name">
            <div>
              <h1>{detail.name}</h1>
              <span className="poke-weight weight-height">Weight:</span>
              <span> {pokeWeight} kg</span>
              <br />
              <span className="poke-height weight-height">Height:</span>
              <span> {pokeHeight} m</span>
            </div>
          </div>
        </div>
        <div className="moves-wrapper">
          {pokeMoves.map((move) => {
            return <Moves key={id} {...move} />;
          })}
        </div>
      </div>
    </Layout>
  );
};

export default PokemonDetail;
